from fastapi import FastAPI, APIRouter, BackgroundTasks, HTTPException, Depends, Header, Request
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
from email_service import send_email
from admin_models import (
    AdminLogin, AdminLoginResponse, 
    StoreLocation, StoreLocationCreate, StoreLocationUpdate,
    PageView
)
from auth_utils import verify_password, create_access_token, verify_token


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Contact Form Models
class ContactSubmissionCreate(BaseModel):
    name: str
    email: str
    phone: str = ""
    subject: str
    message: str

class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str = ""
    subject: str
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Distributor Form Models
class DistributorInquiryCreate(BaseModel):
    companyName: str
    contactName: str
    email: str
    phone: str
    businessType: str
    location: str
    currentBrands: str = ""
    message: str = ""

class DistributorInquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    companyName: str
    contactName: str
    email: str
    phone: str
    businessType: str
    location: str
    currentBrands: str = ""
    message: str = ""
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Contact Form Endpoints
@api_router.post("/contact", response_model=ContactSubmission)
async def submit_contact_form(input: ContactSubmissionCreate, background_tasks: BackgroundTasks):
    contact_dict = input.model_dump()
    contact_obj = ContactSubmission(**contact_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = contact_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.contact_submissions.insert_one(doc)
    
    # Send email notification in background
    notification_email = os.environ.get('NOTIFICATION_EMAIL', 'info@degensdelight.com')
    
    html_body = f"""
    <html>
    <body style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #DC2626;">New Contact Form Submission - Degen's Delight</h2>
        <hr style="border: 1px solid #DC2626;">
        <p><strong>From:</strong> {input.name}</p>
        <p><strong>Email:</strong> <a href="mailto:{input.email}">{input.email}</a></p>
        <p><strong>Phone:</strong> {input.phone if input.phone else "Not provided"}</p>
        <p><strong>Subject:</strong> {input.subject}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #DC2626;">
            {input.message.replace(chr(10), '<br>')}
        </p>
        <hr>
        <p style="font-size: 12px; color: #666;">
            Submitted on: {contact_obj.timestamp.strftime('%Y-%m-%d %H:%M:%S')} UTC
        </p>
    </body>
    </html>
    """
    
    plain_text = f"""
New Contact Form Submission - Degen's Delight

From: {input.name}
Email: {input.email}
Phone: {input.phone if input.phone else "Not provided"}
Subject: {input.subject}

Message:
{input.message}

Submitted on: {contact_obj.timestamp.strftime('%Y-%m-%d %H:%M:%S')} UTC
    """
    
    background_tasks.add_task(
        send_email,
        to_email=notification_email,
        subject=f"New Contact: {input.subject}",
        html_body=html_body,
        plain_text_body=plain_text
    )
    
    return contact_obj

@api_router.get("/contact", response_model=List[ContactSubmission])
async def get_contact_submissions():
    # Exclude MongoDB's _id field from the query results
    submissions = await db.contact_submissions.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for submission in submissions:
        if isinstance(submission['timestamp'], str):
            submission['timestamp'] = datetime.fromisoformat(submission['timestamp'])
    
    return submissions

# Distributor Inquiry Endpoints
@api_router.post("/distributors", response_model=DistributorInquiry)
async def submit_distributor_inquiry(input: DistributorInquiryCreate, background_tasks: BackgroundTasks):
    inquiry_dict = input.model_dump()
    inquiry_obj = DistributorInquiry(**inquiry_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = inquiry_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.distributor_inquiries.insert_one(doc)
    
    # Send email notification in background
    notification_email = os.environ.get('NOTIFICATION_EMAIL', 'info@degensdelight.com')
    
    html_body = f"""
    <html>
    <body style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #DC2626;">New Distributor Inquiry - Degen's Delight</h2>
        <hr style="border: 1px solid #DC2626;">
        <h3>Company Information</h3>
        <p><strong>Company Name:</strong> {input.companyName}</p>
        <p><strong>Contact Person:</strong> {input.contactName}</p>
        <p><strong>Email:</strong> <a href="mailto:{input.email}">{input.email}</a></p>
        <p><strong>Phone:</strong> {input.phone}</p>
        <p><strong>Business Type:</strong> {input.businessType}</p>
        <p><strong>Location:</strong> {input.location}</p>
        <hr>
        <h3>Distribution Details</h3>
        <p><strong>Current Brands:</strong> {input.currentBrands if input.currentBrands else "Not provided"}</p>
        <hr>
        <p><strong>Additional Information:</strong></p>
        <p style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #DC2626;">
            {input.message.replace(chr(10), '<br>') if input.message else "No additional information provided"}
        </p>
        <hr>
        <p style="font-size: 12px; color: #666;">
            Submitted on: {inquiry_obj.timestamp.strftime('%Y-%m-%d %H:%M:%S')} UTC
        </p>
    </body>
    </html>
    """
    
    plain_text = f"""
New Distributor Inquiry - Degen's Delight

Company Information:
Company Name: {input.companyName}
Contact Person: {input.contactName}
Email: {input.email}
Phone: {input.phone}
Business Type: {input.businessType}
Location: {input.location}

Distribution Details:
Current Brands: {input.currentBrands if input.currentBrands else "Not provided"}

Additional Information:
{input.message if input.message else "No additional information provided"}

Submitted on: {inquiry_obj.timestamp.strftime('%Y-%m-%d %H:%M:%S')} UTC
    """
    
    background_tasks.add_task(
        send_email,
        to_email=notification_email,
        subject=f"New Distributor Inquiry from {input.companyName}",
        html_body=html_body,
        plain_text_body=plain_text
    )
    
    return inquiry_obj

@api_router.get("/distributors", response_model=List[DistributorInquiry])
async def get_distributor_inquiries():
    # Exclude MongoDB's _id field from the query results
    inquiries = await db.distributor_inquiries.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for inquiry in inquiries:
        if isinstance(inquiry['timestamp'], str):
            inquiry['timestamp'] = datetime.fromisoformat(inquiry['timestamp'])
    
    return inquiries

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()