import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import logging
import os

logger = logging.getLogger(__name__)

async def send_email(
    to_email: str,
    subject: str,
    html_body: str,
    plain_text_body: str = None
) -> bool:
    """
    Send an email via Google Workspace SMTP.
    
    Args:
        to_email: Recipient email address
        subject: Email subject line
        html_body: HTML content of the email
        plain_text_body: Plain text alternative (optional)
        
    Returns:
        True if successful, False otherwise
    """
    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = int(os.environ.get('SMTP_PORT', 587))
    smtp_username = os.environ.get('SMTP_USERNAME')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    
    try:
        # Create multipart message supporting both HTML and plain text
        message = MIMEMultipart("alternative")
        message["Subject"] = subject
        message["From"] = smtp_username
        message["To"] = to_email
        
        # Attach plain text part first (safest for compatibility)
        if plain_text_body:
            text_part = MIMEText(plain_text_body, "plain")
            message.attach(text_part)
        
        # Attach HTML part second (preferred by most email clients)
        html_part = MIMEText(html_body, "html")
        message.attach(html_part)
        
        # Send email using aiosmtplib (async)
        await aiosmtplib.send(
            message,
            hostname=smtp_host,
            port=smtp_port,
            username=smtp_username,
            password=smtp_password,
            start_tls=True
        )
        
        logger.info(f"Email sent successfully to {to_email}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to send email to {to_email}: {str(e)}")
        return False
