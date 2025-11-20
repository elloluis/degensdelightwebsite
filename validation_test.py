#!/usr/bin/env python3
"""
Test validation specifically for required fields
"""

import requests
import json

BASE_URL = "https://cranberry-vodka.preview.emergentagent.com/api"

def test_validation():
    print("Testing validation with completely missing fields...")
    
    # Test with completely missing required fields
    contact_data_missing = {
        "phone": "+1-555-123-4567"
        # Missing name, email, subject, message
    }
    
    try:
        response = requests.post(f"{BASE_URL}/contact", json=contact_data_missing)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
    except Exception as e:
        print(f"Error: {e}")
    
    print("\nTesting distributor validation with missing fields...")
    
    # Test with completely missing required fields
    distributor_data_missing = {
        "currentBrands": "Test brands"
        # Missing companyName, contactName, email, phone, businessType, location
    }
    
    try:
        response = requests.post(f"{BASE_URL}/distributors", json=distributor_data_missing)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_validation()