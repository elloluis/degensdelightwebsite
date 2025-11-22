from rembg import remove
from PIL import Image

def remove_background(input_path, output_path):
    """Remove background from image and save as PNG with transparency"""
    try:
        print(f"Processing {input_path}...")
        input_image = Image.open(input_path)
        output_image = remove(input_image)
        output_image.save(output_path, 'PNG')
        print(f"✅ Saved to {output_path}")
        return True
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

if __name__ == "__main__":
    # Remove background from new carton image
    remove_background(
        '/app/frontend/public/carton-new.png',
        '/app/frontend/public/carton-final.png'
    )
    
    # Remove background from logo
    remove_background(
        '/app/frontend/public/company-logo.jpg',
        '/app/frontend/public/logo-transparent.png'
    )
    
    print("\n✅ All images processed!")
