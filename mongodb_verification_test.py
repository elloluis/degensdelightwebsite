#!/usr/bin/env python3
"""
Verify MongoDB data storage by checking specific submissions
"""

import requests
import json

BASE_URL = "https://cranberry-vodka.preview.emergentagent.com/api"

def verify_mongodb_storage():
    print("Verifying MongoDB data storage...")
    
    # Submit a unique test record
    unique_identifier = "TEST_MONGODB_VERIFICATION_2025"
    
    contact_data = {
        "name": f"MongoDB Test User {unique_identifier}",
        "email": "mongodb.test@example.com",
        "phone": "+1-555-TEST-123",
        "subject": f"MongoDB Verification {unique_identifier}",
        "message": f"This is a test message to verify MongoDB storage functionality. ID: {unique_identifier}"
    }
    
    print("1. Submitting test contact...")
    try:
        response = requests.post(f"{BASE_URL}/contact", json=contact_data)
        if response.status_code == 200:
            submitted_data = response.json()
            print(f"✅ Contact submitted with ID: {submitted_data['id']}")
            
            # Now retrieve all contacts and verify our submission is there
            print("2. Retrieving all contacts to verify storage...")
            get_response = requests.get(f"{BASE_URL}/contact")
            if get_response.status_code == 200:
                all_contacts = get_response.json()
                
                # Look for our specific submission
                found = False
                for contact in all_contacts:
                    if unique_identifier in contact.get('name', ''):
                        found = True
                        print(f"✅ Found our test submission in MongoDB:")
                        print(f"   ID: {contact['id']}")
                        print(f"   Name: {contact['name']}")
                        print(f"   Email: {contact['email']}")
                        print(f"   Timestamp: {contact['timestamp']}")
                        break
                
                if not found:
                    print("❌ Test submission not found in retrieved data")
                else:
                    print("✅ MongoDB storage verification successful for contacts")
            else:
                print(f"❌ Failed to retrieve contacts: {get_response.text}")
        else:
            print(f"❌ Failed to submit contact: {response.text}")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    # Test distributor storage
    print("\n3. Testing distributor MongoDB storage...")
    distributor_data = {
        "companyName": f"MongoDB Test Company {unique_identifier}",
        "contactName": f"Test Contact {unique_identifier}",
        "email": "mongodb.distributor@example.com",
        "phone": "+1-555-DIST-123",
        "businessType": "distributor",
        "location": "Test City, Test State",
        "currentBrands": "Test Brand 1, Test Brand 2",
        "message": f"MongoDB verification test for distributors. ID: {unique_identifier}"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/distributors", json=distributor_data)
        if response.status_code == 200:
            submitted_data = response.json()
            print(f"✅ Distributor inquiry submitted with ID: {submitted_data['id']}")
            
            # Retrieve and verify
            print("4. Retrieving all distributor inquiries to verify storage...")
            get_response = requests.get(f"{BASE_URL}/distributors")
            if get_response.status_code == 200:
                all_inquiries = get_response.json()
                
                found = False
                for inquiry in all_inquiries:
                    if unique_identifier in inquiry.get('companyName', ''):
                        found = True
                        print(f"✅ Found our test distributor inquiry in MongoDB:")
                        print(f"   ID: {inquiry['id']}")
                        print(f"   Company: {inquiry['companyName']}")
                        print(f"   Contact: {inquiry['contactName']}")
                        print(f"   Business Type: {inquiry['businessType']}")
                        print(f"   Timestamp: {inquiry['timestamp']}")
                        break
                
                if not found:
                    print("❌ Test distributor inquiry not found in retrieved data")
                else:
                    print("✅ MongoDB storage verification successful for distributors")
            else:
                print(f"❌ Failed to retrieve distributor inquiries: {get_response.text}")
        else:
            print(f"❌ Failed to submit distributor inquiry: {response.text}")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    verify_mongodb_storage()