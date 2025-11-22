from rembg import remove
from PIL import Image
import sys

def remove_background(input_path, output_path):
    """Remove background from image and save as PNG with transparency"""
    try:
        print(f"Processing {input_path}...")
        
        # Open image
        input_image = Image.open(input_path)
        
        # Remove background
        output_image = remove(input_image)
        
        # Save as PNG with transparency
        output_image.save(output_path, 'PNG')
        
        print(f"✅ Saved to {output_path}")
        return True
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

if __name__ == "__main__":
    # Remove background from new can image
    remove_background(
        '/app/frontend/public/can-image-new.png',
        '/app/frontend/public/can-transparent.png'
    )
    
    # Remove background from carton image
    remove_background(
        '/app/frontend/public/carton-image.jpg',
        '/app/frontend/public/carton-transparent.png'
    )
    
    print("\n✅ Background removal complete!")
