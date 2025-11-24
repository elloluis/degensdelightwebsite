import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from auth_utils import get_password_hash
import os
from dotenv import load_dotenv
from pathlib import Path
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def init_admin_user():
    """Initialize the admin user in the database"""
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    # Check if admin user already exists
    existing_admin = await db.admin_users.find_one({"email": "luis@degensdelight.com"})
    
    if existing_admin:
        print("✅ Admin user already exists")
        return
    
    # Create admin user
    admin_user = {
        "id": str(uuid.uuid4()),
        "email": "luis@degensdelight.com",
        "password_hash": get_password_hash("Angel2004!"),
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.admin_users.insert_one(admin_user)
    print("✅ Admin user created successfully!")
    print(f"   Email: luis@degensdelight.com")
    print(f"   Password: Angel2004!")

if __name__ == "__main__":
    asyncio.run(init_admin_user())
