from rest_framework import serializers
from .models import Product, ProductImage, Review
import json

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image_url', 'alt_text', 'is_primary']

class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    user_email = serializers.CharField(source='user.email', read_only=True)
    
    class Meta:
        model = Review
        fields = ['id', 'user_name', 'user_email', 'rating', 'comment', 'created_at']

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    average_rating = serializers.ReadOnlyField()
    review_count = serializers.ReadOnlyField()
    discounted_price = serializers.ReadOnlyField()
    is_mobile = serializers.ReadOnlyField()
    is_accessory = serializers.ReadOnlyField()
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'product_id', 'name', 'category', 'category_display', 'brand', 
            'price', 'discounted_price', 'discount_percent', 'description', 
            'stock', 'image_url', 'rating', 'average_rating', 'review_count',
            'created_at', 'updated_at', 'is_mobile', 'is_accessory',
            # Mobile-specific fields
            'ram', 'storage', 'processor', 'battery', 'camera_rear', 'camera_front',
            'display_size', 'display_resolution', 'display_type', 'os', 
            'connectivity', 'dimensions', 'weight', 'color_options',
            # Accessory-specific fields
            'compatible_devices', 'material', 'color', 'warranty',
            # Related fields
            'images', 'reviews'
        ]
        
    def validate_product_id(self, value):
        """Ensure product_id is unique"""
        if self.instance and self.instance.product_id == value:
            return value
        if Product.objects.filter(product_id=value).exists():
            raise serializers.ValidationError("Product ID already exists.")
        return value
    
    def validate(self, data):
        """Custom validation based on category"""
        category = data.get('category')
        
        if category == 'mobiles':
            # Validate mobile-specific required fields
            mobile_fields = ['ram', 'storage', 'processor', 'os']
            for field in mobile_fields:
                if not data.get(field):
                    raise serializers.ValidationError(f"{field} is required for mobile products.")
        
        elif category in ['headphones', 'mobile_cases', 'screen_guards', 'chargers', 'mobile_holders']:
            # Validate accessory-specific required fields
            if not data.get('compatible_devices'):
                raise serializers.ValidationError("Compatible devices is required for accessories.")
            if not data.get('material'):
                raise serializers.ValidationError("Material is required for accessories.")
        
        return data

class ProductListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for product lists"""
    average_rating = serializers.ReadOnlyField()
    review_count = serializers.ReadOnlyField()
    discounted_price = serializers.ReadOnlyField()
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    primary_image = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = [
            'id', 'product_id', 'name', 'category', 'category_display', 'brand',
            'price', 'discounted_price', 'discount_percent', 'stock', 
            'image_url', 'primary_image', 'rating', 'average_rating', 
            'review_count', 'created_at'
        ]
    
    def get_primary_image(self, obj):
        primary_image = obj.images.filter(is_primary=True).first()
        if primary_image:
            return primary_image.image_url
        return obj.image_url

class CategorySerializer(serializers.Serializer):
    """Serializer for category information"""
    category = serializers.CharField()
    category_display = serializers.CharField()
    count = serializers.IntegerField()
    
class ProductCreateUpdateSerializer(serializers.ModelSerializer):
    """Serializer for creating/updating products"""
    
    class Meta:
        model = Product
        exclude = ['created_at', 'updated_at']
        
    def validate_product_id(self, value):
        """Ensure product_id is unique"""
        if self.instance and self.instance.product_id == value:
            return value
        if Product.objects.filter(product_id=value).exists():
            raise serializers.ValidationError("Product ID already exists.")
        return value