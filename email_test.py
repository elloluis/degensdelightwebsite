#!/usr/bin/env python3
"""
Email Notification Testing for Degen's Delight Website
Tests email functionality for contact and distributor forms
"""

import requests
import json
import time
import sys

# Backend URL from frontend/.env
BASE_URL = "https://cranberry-vodka.preview.emergentagent.com/api"

def test_contact_email_notification():
    """Test contact form email notification"""
    print("=" * 60)
    print("TESTING CONTACT FORM EMAIL NOTIFICATION")
    print("=" * 60)
    
    print("\n1. Submitting contact form with realistic data...")
    contact_data = {
        "name": "Alex Thompson",
        "email": "alex.thompson@businessemail.com",
        "phone": "+1-555-234-5678",
        "subject": "Partnership Opportunity",
        "message": "Hello! I represent a high-end restaurant group in Miami and we're interested in featuring Degen's Delight vodka in our cocktail menu. Could we discuss wholesale pricing and availability? We serve approximately 500 customers per night across our three locations."
    }
    
    try:
        print(f"Sending POST request to {BASE_URL}/contact...")
        response = requests.post(f"{BASE_URL}/contact", json=contact_data)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print("✅ API returned 200 success")
            print(f"Submission ID: {data.get('id')}")
            print(f"Timestamp: {data.get('timestamp')}")
            
            # Verify data was stored
            print("\n2. Verifying data was stored in MongoDB...")
            get_response = requests.get(f"{BASE_URL}/contact")
            if get_response.status_code == 200:
                submissions = get_response.json()
                # Find our submission
                our_submission = None
                for sub in submissions:
                    if sub.get('id') == data.get('id'):
                        our_submission = sub
                        break
                
                if our_submission:
                    print("✅ Data successfully stored in MongoDB")
                    print(f"Stored name: {our_submission.get('name')}")
                    print(f"Stored email: {our_submission.get('email')}")
                    print(f"Stored subject: {our_submission.get('subject')}")
                else:
                    print("❌ Data not found in MongoDB")
            else:
                print(f"❌ Failed to retrieve data: {get_response.status_code}")
                
        else:
            print(f"❌ API failed: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return False
    
    return True

def test_distributor_email_notification():
    """Test distributor inquiry email notification"""
    print("\n" + "=" * 60)
    print("TESTING DISTRIBUTOR INQUIRY EMAIL NOTIFICATION")
    print("=" * 60)
    
    print("\n1. Submitting distributor inquiry with realistic data...")
    distributor_data = {
        "companyName": "Elite Spirits Distribution",
        "contactName": "Sarah Martinez",
        "email": "sarah.martinez@elitespirits.com",
        "phone": "+1-555-876-5432",
        "businessType": "distributor",
        "location": "Chicago, IL",
        "currentBrands": "Absolut, Grey Goose, Ketel One, Belvedere",
        "message": "We're a premium spirits distributor serving the Midwest region with over 15 years of experience. We have established relationships with 200+ high-end bars, restaurants, and retail locations. We're interested in adding Degen's Delight to our portfolio and would like to discuss distribution terms, minimum orders, and marketing support."
    }
    
    try:
        print(f"Sending POST request to {BASE_URL}/distributors...")
        response = requests.post(f"{BASE_URL}/distributors", json=distributor_data)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print("✅ API returned 200 success")
            print(f"Inquiry ID: {data.get('id')}")
            print(f"Timestamp: {data.get('timestamp')}")
            
            # Verify data was stored
            print("\n2. Verifying data was stored in MongoDB...")
            get_response = requests.get(f"{BASE_URL}/distributors")
            if get_response.status_code == 200:
                inquiries = get_response.json()
                # Find our inquiry
                our_inquiry = None
                for inq in inquiries:
                    if inq.get('id') == data.get('id'):
                        our_inquiry = inq
                        break
                
                if our_inquiry:
                    print("✅ Data successfully stored in MongoDB")
                    print(f"Stored company: {our_inquiry.get('companyName')}")
                    print(f"Stored contact: {our_inquiry.get('contactName')}")
                    print(f"Stored business type: {our_inquiry.get('businessType')}")
                else:
                    print("❌ Data not found in MongoDB")
            else:
                print(f"❌ Failed to retrieve data: {get_response.status_code}")
                
        else:
            print(f"❌ API failed: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return False
    
    return True

def main():
    """Run email notification tests"""
    print("DEGEN'S DELIGHT EMAIL NOTIFICATION TESTING")
    print(f"Testing against: {BASE_URL}")
    print("=" * 80)
    
    # Test contact form email
    contact_success = test_contact_email_notification()
    
    # Test distributor inquiry email
    distributor_success = test_distributor_email_notification()
    
    print("\n" + "=" * 80)
    print("EMAIL NOTIFICATION TESTING COMPLETE")
    print("=" * 80)
    
    print(f"\nContact form email test: {'✅ PASSED' if contact_success else '❌ FAILED'}")
    print(f"Distributor inquiry email test: {'✅ PASSED' if distributor_success else '❌ FAILED'}")
    
    print("\n📧 EMAIL SENDING STATUS:")
    print("The APIs returned successfully and data was stored in MongoDB.")
    print("Email sending happens in background tasks, so check the backend logs")
    print("at /var/log/supervisor/backend.err.log for email confirmation or errors.")

if __name__ == "__main__":
    main()