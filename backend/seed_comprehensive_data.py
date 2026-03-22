#!/usr/bin/env python3
"""
Comprehensive seed data for MobileHub E-Commerce Platform
Includes all categories: Mobiles, Headphones, Mobile Cases, Screen Guards, Chargers, Mobile Holders
"""

import os
import sys
import django
import json
from decimal import Decimal

# Setup Django
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from products.models import Product, ProductImage

def create_mobile_products():
    """Create mobile phone products"""
    mobiles = [
        {
            'product_id': 'MOB001',
            'name': 'iPhone 15 Pro Max',
            'category': 'mobiles',
            'brand': 'Apple',
            'price': Decimal('1199.99'),
            'discount_percent': 5,
            'description': 'The ultimate iPhone with titanium design, A17 Pro chip, and advanced camera system.',
            'stock': 50,
            'image_url': 'https://images.unsplash.com/photo-1592286927505-b0501739c61b?w=500&h=500&fit=crop',
            'rating': Decimal('4.8'),
            'ram': '8GB',
            'storage': '256GB',
            'processor': 'A17 Pro',
            'battery': '4441mAh',
            'camera_rear': '48MP + 12MP + 12MP',
            'camera_front': '12MP',
            'display_size': '6.7 inches',
            'display_resolution': '2796 x 1290',
            'display_type': 'Super Retina XDR OLED',
            'os': 'iOS 17',
            'connectivity': json.dumps(['5G', 'Wi-Fi 6E', 'Bluetooth 5.3', 'NFC']),
            'dimensions': '159.9 x 76.7 x 8.25 mm',
            'weight': '221g',
            'color_options': json.dumps(['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium']),
            'warranty': '1 Year Apple Warranty'
        },
        {
            'product_id': 'MOB002',
            'name': 'Samsung Galaxy S24 Ultra',
            'category': 'mobiles',
            'brand': 'Samsung',
            'price': Decimal('1299.99'),
            'discount_percent': 10,
            'description': 'Premium Android flagship with S Pen, 200MP camera, and AI features.',
            'stock': 35,
            'image_url': 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=500&fit=crop',
            'rating': Decimal('4.7'),
            'ram': '12GB',
            'storage': '512GB',
            'processor': 'Snapdragon 8 Gen 3',
            'battery': '5000mAh',
            'camera_rear': '200MP + 50MP + 12MP + 10MP',
            'camera_front': '12MP',
            'display_size': '6.8 inches',
            'display_resolution': '3120 x 1440',
            'display_type': 'Dynamic AMOLED 2X',
            'os': 'Android 14',
            'connectivity': json.dumps(['5G', 'Wi-Fi 7', 'Bluetooth 5.3', 'NFC']),
            'dimensions': '162.3 x 79.0 x 8.6 mm',
            'weight': '232g',
            'color_options': json.dumps(['Titanium Black', 'Titanium Gray', 'Titanium Violet', 'Titanium Yellow']),
            'warranty': '1 Year Samsung Warranty'
        },
        {
            'product_id': 'MOB003',
            'name': 'OnePlus 12',
            'category': 'mobiles',
            'brand': 'OnePlus',
            'price': Decimal('799.99'),
            'discount_percent': 15,
            'description': 'Flagship killer with Snapdragon 8 Gen 3, 100W fast charging, and Hasselblad cameras.',
            'stock': 40,
            'image_url': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop',
            'rating': Decimal('4.6'),
            'ram': '16GB',
            'storage': '256GB',
            'processor': 'Snapdragon 8 Gen 3',
            'battery': '5400mAh',
            'camera_rear': '50MP + 64MP + 48MP',
            'camera_front': '32MP',
            'display_size': '6.82 inches',
            'display_resolution': '3168 x 1440',
            'display_type': 'LTPO AMOLED',
            'os': 'OxygenOS 14',
            'connectivity': json.dumps(['5G', 'Wi-Fi 7', 'Bluetooth 5.4', 'NFC']),
            'dimensions': '164.3 x 75.8 x 9.15 mm',
            'weight': '220g',
            'color_options': json.dumps(['Silky Black', 'Flowy Emerald', 'Sunset Dune']),
            'warranty': '1 Year OnePlus Warranty'
        },
        {
            'product_id': 'MOB004',
            'name': 'Google Pixel 8 Pro',
            'category': 'mobiles',
            'brand': 'Google',
            'price': Decimal('999.99'),
            'discount_percent': 8,
            'description': 'AI-powered photography, pure Android experience, and Google Tensor G3 chip.',
            'stock': 25,
            'image_url': 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop',
            'rating': Decimal('4.5'),
            'ram': '12GB',
            'storage': '128GB',
            'processor': 'Google Tensor G3',
            'battery': '5050mAh',
            'camera_rear': '50MP + 48MP + 48MP',
            'camera_front': '10.5MP',
            'display_size': '6.7 inches',
            'display_resolution': '2992 x 1344',
            'display_type': 'LTPO OLED',
            'os': 'Android 14',
            'connectivity': json.dumps(['5G', 'Wi-Fi 7', 'Bluetooth 5.3', 'NFC']),
            'dimensions': '162.6 x 76.5 x 8.8 mm',
            'weight': '213g',
            'color_options': json.dumps(['Obsidian', 'Porcelain', 'Bay']),
            'warranty': '1 Year Google Warranty'
        }
    ]
    
    for mobile_data in mobiles:
        product, created = Product.objects.get_or_create(
            product_id=mobile_data['product_id'],
            defaults=mobile_data
        )
        if created:
            print(f"✅ Created mobile: {product.name}")
        else:
            print(f"📱 Mobile already exists: {product.name}")

def create_headphone_products():
    """Create headphone products"""
    headphones = [
        {
            'product_id': 'HEAD001',
            'name': 'AirPods Pro (2nd Gen)',
            'category': 'headphones',
            'brand': 'Apple',
            'price': Decimal('249.99'),
            'discount_percent': 12,
            'description': 'Premium wireless earbuds with active noise cancellation and spatial audio.',
            'stock': 100,
            'image_url': 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&h=500&fit=crop',
            'rating': Decimal('4.7'),
            'compatible_devices': json.dumps(['iPhone', 'iPad', 'Mac', 'Apple Watch']),
            'material': 'Premium Plastic',
            'color': 'White',
            'warranty': '1 Year Apple Warranty'
        },
        {
            'product_id': 'HEAD002',
            'name': 'Sony WH-1000XM5',
            'category': 'headphones',
            'brand': 'Sony',
            'price': Decimal('399.99'),
            'discount_percent': 20,
            'description': 'Industry-leading noise canceling wireless headphones with 30-hour battery life.',
            'stock': 75,
            'image_url': 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop',
            'rating': Decimal('4.8'),
            'compatible_devices': json.dumps(['All Bluetooth devices', 'Android', 'iPhone', 'PC']),
            'material': 'Premium Plastic & Metal',
            'color': 'Black',
            'warranty': '2 Year Sony Warranty'
        },
        {
            'product_id': 'HEAD003',
            'name': 'Samsung Galaxy Buds2 Pro',
            'category': 'headphones',
            'brand': 'Samsung',
            'price': Decimal('229.99'),
            'discount_percent': 15,
            'description': 'True wireless earbuds with intelligent ANC and 360 Audio.',
            'stock': 80,
            'image_url': 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop',
            'rating': Decimal('4.5'),
            'compatible_devices': json.dumps(['Samsung Galaxy', 'Android', 'iPhone', 'All Bluetooth devices']),
            'material': 'Premium Plastic',
            'color': 'Graphite',
            'warranty': '1 Year Samsung Warranty'
        },
        {
            'product_id': 'HEAD004',
            'name': 'Bose QuietComfort Earbuds',
            'category': 'headphones',
            'brand': 'Bose',
            'price': Decimal('279.99'),
            'discount_percent': 18,
            'description': 'World-class noise cancellation in a true wireless design.',
            'stock': 60,
            'image_url': 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop',
            'rating': Decimal('4.6'),
            'compatible_devices': json.dumps(['All Bluetooth devices', 'Android', 'iPhone']),
            'material': 'Premium Plastic & Silicone',
            'color': 'Triple Black',
            'warranty': '1 Year Bose Warranty'
        }
    ]
    
    for headphone_data in headphones:
        product, created = Product.objects.get_or_create(
            product_id=headphone_data['product_id'],
            defaults=headphone_data
        )
        if created:
            print(f"✅ Created headphone: {product.name}")
        else:
            print(f"🎧 Headphone already exists: {product.name}")

def create_case_products():
    """Create mobile case products"""
    cases = [
        {
            'product_id': 'CASE001',
            'name': 'iPhone 15 Pro Max Leather Case',
            'category': 'mobile_cases',
            'brand': 'Apple',
            'price': Decimal('59.99'),
            'discount_percent': 10,
            'description': 'Premium leather case with MagSafe compatibility for iPhone 15 Pro Max.',
            'stock': 150,
            'image_url': 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop',
            'rating': Decimal('4.4'),
            'compatible_devices': json.dumps(['iPhone 15 Pro Max']),
            'material': 'Genuine Leather',
            'color': 'Black',
            'warranty': '6 Months Apple Warranty'
        },
        {
            'product_id': 'CASE002',
            'name': 'Samsung Galaxy S24 Ultra Rugged Case',
            'category': 'mobile_cases',
            'brand': 'OtterBox',
            'price': Decimal('49.99'),
            'discount_percent': 15,
            'description': 'Military-grade protection with drop protection up to 10 feet.',
            'stock': 120,
            'image_url': 'https://images.unsplash.com/photo-1601593346740-925612772716?w=500&h=500&fit=crop',
            'rating': Decimal('4.6'),
            'compatible_devices': json.dumps(['Samsung Galaxy S24 Ultra']),
            'material': 'TPU & Polycarbonate',
            'color': 'Black',
            'warranty': '1 Year OtterBox Warranty'
        },
        {
            'product_id': 'CASE003',
            'name': 'Universal Silicone Case',
            'category': 'mobile_cases',
            'brand': 'Spigen',
            'price': Decimal('19.99'),
            'discount_percent': 25,
            'description': 'Flexible silicone case with anti-slip grip and shock absorption.',
            'stock': 200,
            'image_url': 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop',
            'rating': Decimal('4.2'),
            'compatible_devices': json.dumps(['Most Android phones', 'iPhone models']),
            'material': 'Premium Silicone',
            'color': 'Clear',
            'warranty': '6 Months Spigen Warranty'
        }
    ]
    
    for case_data in cases:
        product, created = Product.objects.get_or_create(
            product_id=case_data['product_id'],
            defaults=case_data
        )
        if created:
            print(f"✅ Created case: {product.name}")
        else:
            print(f"📱 Case already exists: {product.name}")

def create_screen_guard_products():
    """Create screen guard products"""
    screen_guards = [
        {
            'product_id': 'SCREEN001',
            'name': 'iPhone 15 Pro Max Tempered Glass',
            'category': 'screen_guards',
            'brand': 'ZAGG',
            'price': Decimal('39.99'),
            'discount_percent': 20,
            'description': '9H hardness tempered glass with oleophobic coating and bubble-free installation.',
            'stock': 300,
            'image_url': 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop',
            'rating': Decimal('4.5'),
            'compatible_devices': json.dumps(['iPhone 15 Pro Max']),
            'material': 'Tempered Glass',
            'color': 'Transparent',
            'warranty': '1 Year ZAGG Warranty'
        },
        {
            'product_id': 'SCREEN002',
            'name': 'Samsung Galaxy S24 Ultra Screen Protector',
            'category': 'screen_guards',
            'brand': 'Whitestone',
            'price': Decimal('49.99'),
            'discount_percent': 15,
            'description': 'UV light installation tempered glass with full adhesive coverage.',
            'stock': 250,
            'image_url': 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop',
            'rating': Decimal('4.7'),
            'compatible_devices': json.dumps(['Samsung Galaxy S24 Ultra']),
            'material': 'Tempered Glass',
            'color': 'Transparent',
            'warranty': '6 Months Whitestone Warranty'
        },
        {
            'product_id': 'SCREEN003',
            'name': 'Universal Privacy Screen Guard',
            'category': 'screen_guards',
            'brand': '3M',
            'price': Decimal('29.99'),
            'discount_percent': 10,
            'description': 'Privacy filter that darkens screen when viewed from the side.',
            'stock': 180,
            'image_url': 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop',
            'rating': Decimal('4.3'),
            'compatible_devices': json.dumps(['Most smartphones', '5-7 inch screens']),
            'material': 'Privacy Film',
            'color': 'Dark Tint',
            'warranty': '3 Months 3M Warranty'
        }
    ]
    
    for screen_data in screen_guards:
        product, created = Product.objects.get_or_create(
            product_id=screen_data['product_id'],
            defaults=screen_data
        )
        if created:
            print(f"✅ Created screen guard: {product.name}")
        else:
            print(f"🛡️ Screen guard already exists: {product.name}")

def create_charger_products():
    """Create charger products"""
    chargers = [
        {
            'product_id': 'CHAR001',
            'name': 'iPhone 15 USB-C Fast Charger',
            'category': 'chargers',
            'brand': 'Apple',
            'price': Decimal('29.99'),
            'discount_percent': 5,
            'description': '20W USB-C power adapter for fast charging iPhone 15 series.',
            'stock': 200,
            'image_url': 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&h=500&fit=crop',
            'rating': Decimal('4.6'),
            'compatible_devices': json.dumps(['iPhone 15 series', 'iPad', 'USB-C devices']),
            'material': 'Premium Plastic',
            'color': 'White',
            'warranty': '1 Year Apple Warranty'
        },
        {
            'product_id': 'CHAR002',
            'name': 'Samsung 45W Super Fast Charger',
            'category': 'chargers',
            'brand': 'Samsung',
            'price': Decimal('49.99'),
            'discount_percent': 12,
            'description': '45W USB-C charger with Power Delivery for Samsung Galaxy devices.',
            'stock': 150,
            'image_url': 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&h=500&fit=crop',
            'rating': Decimal('4.5'),
            'compatible_devices': json.dumps(['Samsung Galaxy S24 series', 'Note series', 'USB-C devices']),
            'material': 'Premium Plastic',
            'color': 'Black',
            'warranty': '1 Year Samsung Warranty'
        },
        {
            'product_id': 'CHAR003',
            'name': 'Anker PowerPort III 65W',
            'category': 'chargers',
            'brand': 'Anker',
            'price': Decimal('39.99'),
            'discount_percent': 20,
            'description': 'Universal 65W GaN charger with foldable plug and PowerIQ 3.0.',
            'stock': 180,
            'image_url': 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&h=500&fit=crop',
            'rating': Decimal('4.8'),
            'compatible_devices': json.dumps(['All USB-C devices', 'Laptops', 'Tablets', 'Smartphones']),
            'material': 'GaN Technology',
            'color': 'White',
            'warranty': '18 Months Anker Warranty'
        },
        {
            'product_id': 'CHAR004',
            'name': 'Wireless Charging Pad 15W',
            'category': 'chargers',
            'brand': 'Belkin',
            'price': Decimal('34.99'),
            'discount_percent': 15,
            'description': 'Qi-certified wireless charging pad with LED indicator and foreign object detection.',
            'stock': 120,
            'image_url': 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&h=500&fit=crop',
            'rating': Decimal('4.4'),
            'compatible_devices': json.dumps(['iPhone 8+', 'Samsung Galaxy S6+', 'All Qi-enabled devices']),
            'material': 'Premium Plastic & Fabric',
            'color': 'Black',
            'warranty': '2 Year Belkin Warranty'
        }
    ]
    
    for charger_data in chargers:
        product, created = Product.objects.get_or_create(
            product_id=charger_data['product_id'],
            defaults=charger_data
        )
        if created:
            print(f"✅ Created charger: {product.name}")
        else:
            print(f"🔌 Charger already exists: {product.name}")

def create_holder_products():
    """Create mobile holder products"""
    holders = [
        {
            'product_id': 'HOLD001',
            'name': 'MagSafe Car Mount',
            'category': 'mobile_holders',
            'brand': 'Peak Design',
            'price': Decimal('79.99'),
            'discount_percent': 10,
            'description': 'Premium car mount with MagSafe compatibility and 360-degree rotation.',
            'stock': 80,
            'image_url': 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop',
            'rating': Decimal('4.7'),
            'compatible_devices': json.dumps(['iPhone 12+', 'MagSafe compatible cases']),
            'material': 'Aluminum & Premium Plastic',
            'color': 'Black',
            'warranty': '1 Year Peak Design Warranty'
        },
        {
            'product_id': 'HOLD002',
            'name': 'Universal Dashboard Mount',
            'category': 'mobile_holders',
            'brand': 'iOttie',
            'price': Decimal('29.99'),
            'discount_percent': 25,
            'description': 'Adjustable dashboard mount with strong suction cup and telescopic arm.',
            'stock': 150,
            'image_url': 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop',
            'rating': Decimal('4.3'),
            'compatible_devices': json.dumps(['All smartphones 4-7 inches']),
            'material': 'ABS Plastic & Silicone',
            'color': 'Black',
            'warranty': '1 Year iOttie Warranty'
        },
        {
            'product_id': 'HOLD003',
            'name': 'Desktop Phone Stand',
            'category': 'mobile_holders',
            'brand': 'Lamicall',
            'price': Decimal('15.99'),
            'discount_percent': 30,
            'description': 'Adjustable aluminum desktop stand for phones and tablets.',
            'stock': 200,
            'image_url': 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop',
            'rating': Decimal('4.5'),
            'compatible_devices': json.dumps(['All smartphones', 'Tablets up to 10 inches']),
            'material': 'Aluminum Alloy',
            'color': 'Silver',
            'warranty': '6 Months Lamicall Warranty'
        }
    ]
    
    for holder_data in holders:
        product, created = Product.objects.get_or_create(
            product_id=holder_data['product_id'],
            defaults=holder_data
        )
        if created:
            print(f"✅ Created holder: {product.name}")
        else:
            print(f"📱 Holder already exists: {product.name}")

def main():
    """Main function to create all seed data"""
    print("🚀 Starting comprehensive seed data creation...")
    print("=" * 60)
    
    # Create products for each category
    print("\n📱 Creating Mobile Products...")
    create_mobile_products()
    
    print("\n🎧 Creating Headphone Products...")
    create_headphone_products()
    
    print("\n📱 Creating Mobile Case Products...")
    create_case_products()
    
    print("\n🛡️ Creating Screen Guard Products...")
    create_screen_guard_products()
    
    print("\n🔌 Creating Charger Products...")
    create_charger_products()
    
    print("\n📱 Creating Mobile Holder Products...")
    create_holder_products()
    
    print("\n" + "=" * 60)
    print("✅ Comprehensive seed data creation completed!")
    
    # Print summary
    total_products = Product.objects.count()
    categories = Product.objects.values('category').distinct().count()
    
    print(f"\n📊 Summary:")
    print(f"   Total Products: {total_products}")
    print(f"   Categories: {categories}")
    
    for category, display_name in Product.CATEGORY_CHOICES:
        count = Product.objects.filter(category=category).count()
        print(f"   {display_name}: {count} products")

if __name__ == '__main__':
    main()