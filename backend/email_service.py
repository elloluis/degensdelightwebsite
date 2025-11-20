import requests
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
    Send an email via Mailgun API.
    
    Args:
        to_email: Recipient email address
        subject: Email subject line
        html_body: HTML content of the email
        plain_text_body: Plain text alternative (optional)
        
    Returns:
        True if successful, False otherwise
    """
    api_key = os.environ.get('MAILGUN_API_KEY')
    domain = os.environ.get('MAILGUN_DOMAIN')
    from_email = os.environ.get('MAILGUN_FROM_EMAIL')
    
    try:
        # Mailgun API endpoint
        endpoint = f"https://api.mailgun.net/v3/{domain}/messages"
        
        # Prepare email data
        data = {
            "from": from_email,
            "to": to_email,
            "subject": subject,
            "html": html_body
        }
        
        # Add plain text if provided
        if plain_text_body:
            data["text"] = plain_text_body
        
        # Send email via Mailgun API
        response = requests.post(
            endpoint,
            auth=("api", api_key),
            data=data,
            timeout=10
        )
        
        response.raise_for_status()
        result = response.json()
        
        logger.info(f"Email sent successfully to {to_email}: {result.get('id')}")
        return True
        
    except requests.exceptions.Timeout:
        logger.error(f"Timeout sending email to {to_email}")
        return False
    except requests.exceptions.HTTPError as e:
        logger.error(f"HTTP error sending email: Status {e.response.status_code} - {e.response.text}")
        return False
    except Exception as e:
        logger.error(f"Failed to send email to {to_email}: {str(e)}")
        return False
