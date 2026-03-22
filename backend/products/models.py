from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid

User = get_user_model()

def generate_product_id():
    """Generate a unique product ID"""
    return f"PROD{str(uuid.uuid4().hex[:8]).upper()}"

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('mobiles', 'Mobiles'),
        ('headphones', 'Headphones'),
        ('mobile_cases', 'Mobile Cases'),
        ('screen_guards', 'Screen Guards'),
        ('chargers', 'Chargers'),
        ('mobile_holders', 'Mobile Holders'),
    ]
    
    # Required fields for all products
    product_id = models.CharField(max_length=50, unique=True, help_text="Unique product identifier", default=generate_product_id)
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    brand = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    stock = models.IntegerField(validators=[MinValueValidator(0)])
    image_url = models.URLField(blank=True, null=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0, 
                                validators=[MinValueValidator(0.0), MaxValueValidator(5.0)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Mobile-specific fields
    ram = models.CharField(max_length=50, blank=True, null=True, help_text="RAM capacity (e.g., 8GB)")
    storage = models.CharField(max_length=50, blank=True, null=True, help_text="Storage capacity (e.g., 128GB)")
    processor = models.CharField(max_length=100, blank=True, null=True)
    battery = models.CharField(max_length=50, blank=True, null=True, help_text="Battery capacity (e.g., 4000mAh)")
    camera_rear = models.CharField(max_length=100, blank=True, null=True)
    camera_front = models.CharField(max_length=100, blank=True, null=True)
    display_size = models.CharField(max_length=50, blank=True, null=True, help_text="Display size (e.g., 6.1 inches)")
    display_resolution = models.CharField(max_length=50, blank=True, null=True)
    display_type = models.CharField(max_length=100, blank=True, null=True)
    os = models.CharField(max_length=100, blank=True, null=True, help_text="Operating System")
    connectivity = models.TextField(blank=True, null=True, help_text="Connectivity options (JSON format)")
    dimensions = models.CharField(max_length=100, blank=True, null=True)
    weight = models.CharField(max_length=50, blank=True, null=True)
    color_options = models.TextField(blank=True, null=True, help_text="Available colors (JSON format)")
    
    # Accessory-specific fields
    compatible_devices = models.TextField(blank=True, null=True, help_text="Compatible devices (JSON format)")
    material = models.CharField(max_length=100, blank=True, null=True)
    color = models.CharField(max_length=50, blank=True, null=True)
    warranty = models.CharField(max_length=100, blank=True, null=True, help_text="Warranty period")
    
    # Additional fields for specific accessories
    discount_percent = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['category']),
            models.Index(fields=['brand']),
            models.Index(fields=['price']),
            models.Index(fields=['rating']),
        ]
    
    def __str__(self):
        return f"{self.brand} {self.name}"
    
    @property
    def average_rating(self):
        reviews = self.reviews.all()
        if reviews:
            return sum(review.rating for review in reviews) / len(reviews)
        return self.rating
    
    @property
    def review_count(self):
        return self.reviews.count()
    
    @property
    def is_mobile(self):
        return self.category == 'mobiles'
    
    @property
    def is_accessory(self):
        return self.category in ['headphones', 'mobile_cases', 'screen_guards', 'chargers', 'mobile_holders']
    
    @property
    def discounted_price(self):
        if self.discount_percent > 0:
            discount_amount = (self.price * self.discount_percent) / 100
            return self.price - discount_amount
        return self.price

class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image_url = models.URLField()
    alt_text = models.CharField(max_length=255, blank=True)
    is_primary = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Image for {self.product.name}"

class Review(models.Model):
    product = models.ForeignKey(Product, related_name='reviews', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('product', 'user')
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Review by {self.user.email} for {self.product.name}"