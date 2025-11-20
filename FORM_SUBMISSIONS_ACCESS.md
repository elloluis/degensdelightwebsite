# Form Submissions Access Guide

## Overview
All contact and distributor form submissions are stored in MongoDB and can be retrieved via API endpoints.

## API Endpoints

### Contact Form Submissions

**GET all contact submissions:**
```bash
curl https://cranberry-vodka.preview.emergentagent.com/api/contact
```

**Response format:**
```json
[
  {
    "id": "uuid-string",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "555-123-4567",
    "subject": "Product Inquiry",
    "message": "Message text here",
    "timestamp": "2025-11-20T01:27:11.749950Z"
  }
]
```

### Distributor Inquiry Submissions

**GET all distributor inquiries:**
```bash
curl https://cranberry-vodka.preview.emergentagent.com/api/distributors
```

**Response format:**
```json
[
  {
    "id": "uuid-string",
    "companyName": "Test Distribution Co",
    "contactName": "Jane Distributor",
    "email": "jane@testdist.com",
    "phone": "555-987-6543",
    "businessType": "distributor",
    "location": "Miami, FL",
    "currentBrands": "High Noon, White Claw",
    "message": "Interested in distributing",
    "timestamp": "2025-11-20T01:28:24.351181Z"
  }
]
```

## Database Details

- **Database Name:** `test_database` (configured in `/app/backend/.env`)
- **Collections:**
  - `contact_submissions` - Stores all contact form submissions
  - `distributor_inquiries` - Stores all distributor inquiry submissions

## Features

✅ All submissions include:
- Unique UUID for each submission
- UTC timestamp of submission
- All form fields (required and optional)

✅ Data persistence:
- All submissions are permanently stored in MongoDB
- Data survives server restarts
- No data expiration

## Accessing Data Programmatically

You can access the form submissions from any application by making GET requests to the API endpoints:

**JavaScript/Frontend:**
```javascript
const response = await fetch('https://cranberry-vodka.preview.emergentagent.com/api/contact');
const submissions = await response.json();
```

**Python:**
```python
import requests
response = requests.get('https://cranberry-vodka.preview.emergentagent.com/api/contact')
submissions = response.json()
```

**cURL:**
```bash
curl -X GET https://cranberry-vodka.preview.emergentagent.com/api/contact | jq .
```

## Future Enhancements (Optional)

Consider adding:
1. Admin dashboard to view submissions in a UI
2. Email notifications when new forms are submitted
3. Filtering/sorting endpoints (by date, email, etc.)
4. Export functionality (CSV/Excel)
5. Authentication to protect GET endpoints
6. Pagination for large datasets
