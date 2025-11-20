#!/usr/bin/env python3
"""
Mailgun Email Integration Test for Contact Form
Tests the specific scenario requested by the user
"""

import requests
import json
import time

# Backend URL from frontend/.env
BASE_URL = "https://cranberry-vodka.preview.emergentagent.com/api"

def test_mailgun_contact_form():
    """Test Mailgun email integration for contact form"""
    print("=" * 80)
    print("TESTING MAILGUN EMAIL INTEGRATION FOR CONTACT FORM")
    print("=" * 80)
    
    # Test data as specified by the user
    test_data = {
        "name": "Test User",
        "email": "test@example.com",
        "phone": "555-123-4567",
        "subject": "Testing Mailgun Integration",
        "message": "This is a test to verify Mailgun email sending is working correctly."
    }
    
    print(f"Testing endpoint: POST {BASE_URL}/contact")
    print(f"Test data: {json.dumps(test_data, indent=2)}")
    print("\n" + "-" * 60)
    
    try:
        # Submit the contact form
        print("1. Submitting contact form...")
        response = requests.post(f"{BASE_URL}/contact", json=test_data)
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            print("✅ API returned 200 success")
            data = response.json()
            print(f"Response data: {json.dumps(data, indent=2)}")
            
            # Verify response structure
            if 'id' in data and 'timestamp' in data:
                print("✅ Response includes id and timestamp")
                submission_id = data['id']
                print(f"Submission ID: {submission_id}")
            else:
                print("❌ Response missing id or timestamp")
                return False
                
        else:
            print(f"❌ API failed with status {response.status_code}: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error submitting form: {e}")
        return False
    
    # Wait a moment for background task to process
    print("\n2. Waiting 3 seconds for email background task to process...")
    time.sleep(3)
    
    # Verify data is stored in MongoDB
    print("\n3. Verifying data is stored in MongoDB...")
    try:
        get_response = requests.get(f"{BASE_URL}/contact")
        if get_response.status_code == 200:
            submissions = get_response.json()
            # Find our submission
            our_submission = None
            for submission in submissions:
                if (submission.get('name') == test_data['name'] and 
                    submission.get('email') == test_data['email'] and
                    submission.get('subject') == test_data['subject']):
                    our_submission = submission
                    break
            
            if our_submission:
                print("✅ Data is stored in MongoDB")
                print(f"Stored submission: {json.dumps(our_submission, indent=2)}")
            else:
                print("❌ Submission not found in MongoDB")
                print(f"Total submissions found: {len(submissions)}")
                return False
        else:
            print(f"❌ Failed to retrieve submissions: {get_response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error checking MongoDB: {e}")
        return False
    
    print("\n4. Test completed successfully!")
    print("✅ API returns 200 success")
    print("✅ Data is stored in MongoDB")
    print("\nNext step: Check backend logs for Mailgun email success")
    print("Expected log message: 'Email sent successfully to luis@degensdelight.com' with Mailgun message ID")
    print("Log location: /var/log/supervisor/backend.err.log")
    
    return True

if __name__ == "__main__":
    success = test_mailgun_contact_form()
    if success:
        print("\n" + "=" * 80)
        print("MAILGUN INTEGRATION TEST COMPLETED SUCCESSFULLY")
        print("=" * 80)
    else:
        print("\n" + "=" * 80)
        print("MAILGUN INTEGRATION TEST FAILED")
        print("=" * 80)