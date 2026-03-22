from rest_framework import serializers
from .models import Order, OrderItem
from products.serializers import ProductSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_id', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    user_email = serializers.CharField(source='user.email', read_only=True)
    
    class Meta:
        model = Order
        fields = [
            'id', 'user_email', 'total_amount', 'status', 'payment_method',
            'street', 'city', 'state', 'zip_code', 'country',
            'items', 'created_at', 'updated_at'
        ]

class OrderCreateSerializer(serializers.ModelSerializer):
    items = serializers.ListField(write_only=True)
    
    class Meta:
        model = Order
        fields = [
            'total_amount', 'payment_method', 'street', 'city', 
            'state', 'zip_code', 'country', 'items'
        ]
    
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        
        return order