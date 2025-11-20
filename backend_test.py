#!/usr/bin/env python3
"""
Backend API Testing for Degen's Delight Website
Tests contact form and distributor inquiry endpoints
"""

import requests
import json
import uuid
from datetime import datetime
import sys

# Backend URL from frontend/.env
BASE_URL = "https://cranberry-vodka.preview.emergentagent.com/api"

def test_contact_endpoints():
    """Test contact form endpoints"""
    print("=" * 60)
    print("TESTING CONTACT FORM ENDPOINTS")
    print("=" * 60)
    
    # Test 1: POST /api/contact with all fields filled
    print("\n1. Testing POST /api/contact with all fields filled...")
    contact_data_full = {
        "name": "John Smith",
        "email": "john.smith@example.com",
        "phone": "+1-555-123-4567",
        "subject": "Product Inquiry",
        "message": "I'm interested in learning more about your premium vodka selection for my restaurant."
    }
    
    try:
        response = requests.post(f"{BASE_URL}/contact", json=contact_data_full)
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {json.dumps(data, indent=2)}")
            # Verify response includes id and timestamp
            if 'id' in data and 'timestamp' in data:
                print("✅ Response includes id and timestamp")
            else:
                print("❌ Response missing id or timestamp")
        else:
            print(f"❌ Failed: {response.text}")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    # Test 2: POST /api/contact with optional phone field empty
    print("\n2. Testing POST /api/contact with optional phone field empty...")
    contact_data_no_phone = {
        "name": "Sarah Johnson",
        "email": "sarah.johnson@example.com",
        "phone": "",
        "subject": "General Question",
        "message": "What are your hours of operation?"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/contact", json=contact_data_no_phone)
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {json.dumps(data, indent=2)}")
            print("✅ Successfully handled empty phone field")
        else:
            print(f"❌ Failed: {response.text}")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    # Test 3: POST /api/contact with missing required fields (should return 422)
    print("\n3. Testing POST /api/contact with missing required fields...")
    contact_data_missing = {
        "name": "Test User",
        "email": "",  # Missing required email
        "subject": "Test",
        "message": "Test message"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/contact", json=contact_data_missing)
        print(f"Status Code: {response.status_code}")
        if response.status_code == 422:
            print("✅ Correctly returned 422 for missing required fields")
            print(f"Error details: {response.text}")
        else:
            print(f"❌ Expected 422, got {response.status_code}: {response.text}")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    # Test 4: POST /api/contact with special characters in message
    print("\n4. Testing POST /api/contact with special characters in message...")
    contact_data_special = {
        "name": "María González",
        "email": "maria@example.com",
        "phone": "+34-123-456-789",
        "subject": "Consulta Especial",
        "message": "Hola! I'm interested in your products. Special chars: @#$%^&*()_+{}|:<>?[]\\;'\",./ 🍸🥃"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/contact", json=contact_data_special)
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print("✅ Successfully handled special characters")
            print(f"Message stored: {data.get('message', 'N/A')}")
        else:
            print(f"❌ Failed: {response.text}")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    # Test 5: GET /api/contact - Retrieve all contact submissions
    print("\n5. Testing GET /api/contact - Retrieve all submissions...")
    try:
        response = requests.get(f"{BASE_URL}/contact")
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Number of submissions retrieved: {len(data)}")
            if len(data) > 0:
                print("✅ Successfully retrieved contact submissions")
                # Check timestamp format
                first_submission = data[0]
                if 'timestamp' in first_submission:
                    print(f"Timestamp format: {first_submission['timestamp']}")
                    print("✅ Timestamp format is correct")
                else:
                    print("❌ Timestamp missing in response")
            else:
                print("⚠️ No submissions found (this might be expected if database is empty)")
        else:
            print(f"❌ Failed: {response.text}")
    except Exception as e:
        print(f"❌ Error: {e}")

def test_distributor_endpoints():
    """Test distributor inquiry endpoints"""
    print("\n" + "=" * 60)
    print("TESTING DISTRIBUTOR INQUIRY ENDPOINTS")
    print("=" * 60)
    
    # Test 1: POST /api/distributors with all fields filled
    print("\n1. Testing POST /api/distributors with all fields filled...")
    distributor_data_full = {
        "companyName": "Premium Spirits Distribution LLC",
        "contactName": "Michael Rodriguez",
        "email": "michael@premiumspirits.com",
        "phone": "+1-555-987-6543",
        "businessType": "distributor",
        "location": "Los Angeles, CA",
        "currentBrands": "Grey Goose, Belvedere, Tito's",
        "message": "We're interested in adding Degen's Delight to our premium vodka portfolio. We have strong relationships with high-end restaurants and bars in the LA area."
    }
    
    try:
        response = requests.post(f"{BASE_URL}/distributors", json=distributor_data_full)
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {json.dumps(data, indent=2)}")
            # Verify response includes id and timestamp
            if 'id' in data and 'timestamp' in data:
                print("✅ Response includes id and timestamp")
            else:
                print("❌ Response missing id or timestamp")
        else:
            print(f"❌ Failed: {response.text}")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    # Test 2: POST /api/distributors with optional fields empty
    print("\n2. Testing POST /api/distributors with optional currentBrands and message empty...")
    distributor_data_minimal = {
        "companyName": "City Bar & Grill",
        "contactName": "Jennifer Lee",
        "email": "jennifer@citybar.com",
        "phone": "+1-555-456-7890",
        "businessType": "bar",
        "location": "New York, NY",
        "currentBrands": "",
        "message": ""
    }
    
    try:
        response = requests.post(f"{BASE_URL}/distributors", json=distributor_data_minimal)
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print("✅ Successfully handled empty optional fields")
            print(f"Company: {data.get('companyName')}, Type: {data.get('businessType')}")
        else:
            print(f"❌ Failed: {response.text}")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    # Test 3: POST /api/distributors with missing required fields (should return 422)
    print("\n3. Testing POST /api/distributors with missing required fields...")
    distributor_data_missing = {
        "companyName": "Test Company",
        "contactName": "",  # Missing required field
        "email": "test@example.com",
        "phone": "+1-555-123-4567",
        "businessType": "restaurant",
        "location": "Test City"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/distributors", json=distributor_data_missing)
        print(f"Status Code: {response.status_code}")
        if response.status_code == 422:
            print("✅ Correctly returned 422 for missing required fields")
            print(f"Error details: {response.text}")
        else:
            print(f"❌ Expected 422, got {response.status_code}: {response.text}")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    # Test 4: Test all businessType values
    print("\n4. Testing all businessType values...")
    business_types = ["distributor", "bar", "restaurant", "retailer", "other"]
    
    for btype in business_types:
        print(f"\n   Testing businessType: {btype}")
        distributor_data_type = {
            "companyName": f"Test {btype.title()} Company",
            "contactName": "Test Contact",
            "email": f"test.{btype}@example.com",
            "phone": "+1-555-000-0000",
            "businessType": btype,
            "location": "Test Location",
            "currentBrands": "Test Brands",
            "message": f"Test message for {btype} business type"
        }
        
        try:
            response = requests.post(f"{BASE_URL}/distributors", json=distributor_data_type)
            print(f"   Status Code: {response.status_code}")
            if response.status_code == 200:
                data = response.json()
                print(f"   ✅ Successfully processed businessType: {btype}")
            else:
                print(f"   ❌ Failed for {btype}: {response.text}")
        except Exception as e:
            print(f"   ❌ Error for {btype}: {e}")
    
    # Test 5: GET /api/distributors - Retrieve all distributor inquiries
    print("\n5. Testing GET /api/distributors - Retrieve all inquiries...")
    try:
        response = requests.get(f"{BASE_URL}/distributors")
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Number of inquiries retrieved: {len(data)}")
            if len(data) > 0:
                print("✅ Successfully retrieved distributor inquiries")
                # Check timestamp format
                first_inquiry = data[0]
                if 'timestamp' in first_inquiry:
                    print(f"Timestamp format: {first_inquiry['timestamp']}")
                    print("✅ Timestamp format is correct")
                else:
                    print("❌ Timestamp missing in response")
            else:
                print("⚠️ No inquiries found (this might be expected if database is empty)")
        else:
            print(f"❌ Failed: {response.text}")
    except Exception as e:
        print(f"❌ Error: {e}")

def main():
    """Run all backend tests"""
    print("DEGEN'S DELIGHT BACKEND API TESTING")
    print(f"Testing against: {BASE_URL}")
    print("=" * 80)
    
    # Test contact endpoints
    test_contact_endpoints()
    
    # Test distributor endpoints
    test_distributor_endpoints()
    
    print("\n" + "=" * 80)
    print("BACKEND TESTING COMPLETE")
    print("=" * 80)

if __name__ == "__main__":
    main()