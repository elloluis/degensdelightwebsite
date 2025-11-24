from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime, timezone
import uuid
from typing import Optional

# Admin User Models
class AdminUser(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    password_hash: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Store Location Models
class StoreLocationCreate(BaseModel):
    name: str
    address: str
    city: str
    state: str
    zip_code: str
    phone: str = ""
    hours: str = ""
    latitude: float
    longitude: float

class StoreLocation(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    address: str
    city: str
    state: str
    zip_code: str
    phone: str = ""
    hours: str = ""
    latitude: float
    longitude: float
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StoreLocationUpdate(BaseModel):
    name: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    phone: Optional[str] = None
    hours: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None

# Analytics Models
class PageView(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    page_path: str
    visitor_id: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    user_agent: str = ""
    referrer: str = ""

# Admin Login Models
class AdminLogin(BaseModel):
    email: str
    password: str

class AdminLoginResponse(BaseModel):
    success: bool
    token: str
    email: str
