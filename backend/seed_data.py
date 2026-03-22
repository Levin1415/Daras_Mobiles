import os
import django
import json

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from products.models import Product, ProductImage

def seed_products():
    # Clear existing products
    Product.objects.all().delete()
    
    smartphones = [
        {
            "name": "iPhone 15 Pro Max",
            "brand": "Apple",
            "category": "iPhone",
            "price": 1199,
            "discount_percent": 5,
            "stock": 50,
            "description": "Ultimate iPhone with titanium design, A17 Pro chip, and advanced camera system.",
            "processor": "A17 Pro",
            "ram": "8GB",
            "storage": "256GB",
            "display_size": "6.7 inch",
            "display_resolution": "2796 x 1290",
            "display_type": "Super Retina XDR OLED",
            "battery": "4422 mAh",
            "os": "iOS 17",
            "connectivity": '["5G", "WiFi 6E", "USB-C"]',
            "camera_rear": "48MP + 12MP + 12MP",
            "camera_front": "12MP",
            "color_options": '["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"]',
            "images": ["https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800"]
        },
        {
            "name": "iPhone 15",
            "brand": "Apple", 
            "category": "iPhone",
            "price": 799,
            "discount_percent": 8,
            "stock": 80,
            "description": "Dynamic Island, 48MP camera, and all-day battery life in a stunning design.",
            "processor": "A16 Bionic",
            "ram": "6GB",
            "storage": "128GB",
            "display_size": "6.1 inch",
            "display_resolution": "2556 x 1179",
            "display_type": "Super Retina XDR OLED",
            "battery": "3349 mAh",
            "os": "iOS 17",
            "connectivity": '["5G", "WiFi 6", "USB-C"]',
            "camera_rear": "48MP + 12MP",
            "camera_front": "12MP",
            "color_options": '["Pink", "Yellow", "Green", "Blue", "Black"]',
            "images": ["https://images.unsplash.com/photo-1592286927505-b0501739c61b?w=800"]
        },
        {
            "name": "Samsung Galaxy S24 Ultra",
            "brand": "Samsung",
            "category": "Samsung", 
            "price": 1299,
            "discount_percent": 10,
            "stock": 45,
            "description": "Galaxy AI is here. Epic performance with Snapdragon 8 Gen 3 and 200MP camera.",
            "processor": "Snapdragon 8 Gen 3",
            "ram": "12GB",
            "storage": "256GB",
            "display_size": "6.8 inch",
            "display_resolution": "3120 x 1440",
            "display_type": "Dynamic AMOLED 2X",
            "battery": "5000 mAh",
            "os": "Android 14",
            "connectivity": '["5G", "WiFi 7", "USB-C"]',
            "camera_rear": "200MP + 50MP + 10MP + 12MP",
            "camera_front": "12MP",
            "color_options": '["Titanium Gray", "Titanium Black", "Titanium Violet"]',
            "images": ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800"]
        }
    ]
    
    # Add more products here...
    
    for phone_data in smartphones:
        images = phone_data.pop('images', [])
        product = Product.objects.create(**phone_data)
        
        # Add images
        for i, image_url in enumerate(images):
            ProductImage.objects.create(
                product=product,
                image_url=image_url,
                is_primary=(i == 0)
            )
    
    print(f"✅ Successfully added {len(smartphones)} products!")

if __name__ == '__main__':
    seed_products()