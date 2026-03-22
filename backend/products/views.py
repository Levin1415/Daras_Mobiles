from rest_framework import status, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q, Count
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import Product, ProductImage, Review
from .serializers import (
    ProductSerializer, ProductListSerializer, ProductCreateUpdateSerializer,
    CategorySerializer, ProductImageSerializer, ReviewSerializer
)

class ProductPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = 'limit'
    max_page_size = 100

@csrf_exempt
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def product_list_create(request):
    if request.method == 'GET':
        # Get query parameters
        category = request.GET.get('category')
        brand = request.GET.get('brand')
        search = request.GET.get('search')
        min_price = request.GET.get('min_price')
        max_price = request.GET.get('max_price')
        ordering = request.GET.get('ordering', '-created_at')
        
        # Start with all products
        queryset = Product.objects.all()
        
        # Apply filters
        if category:
            # Support comma-separated list of categories (e.g. "mobiles,headphones")
            if ',' in category:
                categories = [c.strip() for c in category.split(',') if c.strip()]
                queryset = queryset.filter(category__in=categories)
            else:
                queryset = queryset.filter(category=category)
        
        if brand:
            queryset = queryset.filter(brand__icontains=brand)
        
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) |
                Q(description__icontains=search) |
                Q(brand__icontains=search)
            )
        
        if min_price:
            try:
                queryset = queryset.filter(price__gte=float(min_price))
            except ValueError:
                pass
        
        if max_price:
            try:
                queryset = queryset.filter(price__lte=float(max_price))
            except ValueError:
                pass
        
        # Apply ordering
        valid_orderings = ['name', '-name', 'price', '-price', 'rating', '-rating', 'created_at', '-created_at']
        if ordering in valid_orderings:
            queryset = queryset.order_by(ordering)
        
        # Pagination
        paginator = ProductPagination()
        page = paginator.paginate_queryset(queryset, request)
        
        if page is not None:
            serializer = ProductListSerializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)
        
        serializer = ProductListSerializer(queryset, many=True)
        return Response({
            'success': True,
            'data': serializer.data,
            'count': queryset.count()
        })
    
    elif request.method == 'POST':
        if not request.user.is_authenticated or not request.user.is_staff:
            return Response({
                'success': False,
                'message': 'Permission denied'
            }, status=status.HTTP_403_FORBIDDEN)
        
        serializer = ProductCreateUpdateSerializer(data=request.data)
        if serializer.is_valid():
            product = serializer.save()
            return Response({
                'success': True,
                'data': ProductSerializer(product).data,
                'message': 'Product created successfully'
            }, status=status.HTTP_201_CREATED)
        
        return Response({
            'success': False,
            'message': 'Validation failed',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([AllowAny])
def product_detail(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({
            'success': False,
            'message': 'Product not found'
        }, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response({
            'success': True,
            'data': serializer.data
        })
    
    elif request.method == 'PUT':
        if not request.user.is_authenticated or not request.user.is_staff:
            return Response({
                'success': False,
                'message': 'Permission denied'
            }, status=status.HTTP_403_FORBIDDEN)
        
        serializer = ProductCreateUpdateSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            product = serializer.save()
            return Response({
                'success': True,
                'data': ProductSerializer(product).data,
                'message': 'Product updated successfully'
            })
        
        return Response({
            'success': False,
            'message': 'Validation failed',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        if not request.user.is_authenticated or not request.user.is_staff:
            return Response({
                'success': False,
                'message': 'Permission denied'
            }, status=status.HTTP_403_FORBIDDEN)
        
        product.delete()
        return Response({
            'success': True,
            'message': 'Product deleted successfully'
        }, status=status.HTTP_204_NO_CONTENT)

@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def categories_list(request):
    """Get all categories with product counts"""
    categories = Product.objects.values('category').annotate(
        count=Count('id')
    ).order_by('category')
    
    category_data = []
    for cat in categories:
        category_data.append({
            'category': cat['category'],
            'category_display': dict(Product.CATEGORY_CHOICES).get(cat['category'], cat['category']),
            'count': cat['count']
        })
    
    return Response({
        'success': True,
        'data': category_data
    })

@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def category_products(request, category):
    """Get products by category"""
    if category not in dict(Product.CATEGORY_CHOICES):
        return Response({
            'success': False,
            'message': 'Invalid category'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    # Get query parameters
    brand = request.GET.get('brand')
    search = request.GET.get('search')
    min_price = request.GET.get('min_price')
    max_price = request.GET.get('max_price')
    ordering = request.GET.get('ordering', '-created_at')
    
    # Filter products by category
    queryset = Product.objects.filter(category=category)
    
    # Apply additional filters
    if brand:
        queryset = queryset.filter(brand__icontains=brand)
    
    if search:
        queryset = queryset.filter(
            Q(name__icontains=search) |
            Q(description__icontains=search) |
            Q(brand__icontains=search)
        )
    
    if min_price:
        try:
            queryset = queryset.filter(price__gte=float(min_price))
        except ValueError:
            pass
    
    if max_price:
        try:
            queryset = queryset.filter(price__lte=float(max_price))
        except ValueError:
            pass
    
    # Apply ordering
    valid_orderings = ['name', '-name', 'price', '-price', 'rating', '-rating', 'created_at', '-created_at']
    if ordering in valid_orderings:
        queryset = queryset.order_by(ordering)
    
    # Pagination
    paginator = ProductPagination()
    page = paginator.paginate_queryset(queryset, request)
    
    if page is not None:
        serializer = ProductListSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)
    
    serializer = ProductListSerializer(queryset, many=True)
    return Response({
        'success': True,
        'data': serializer.data,
        'count': queryset.count(),
        'category': category,
        'category_display': dict(Product.CATEGORY_CHOICES).get(category, category)
    })

@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def featured_products(request):
    """Get featured products (high rating or recent)"""
    # Get products with high ratings or recent additions
    featured = Product.objects.filter(
        Q(rating__gte=4.0) | Q(discount_percent__gt=0)
    ).order_by('-rating', '-created_at')[:8]
    
    serializer = ProductListSerializer(featured, many=True)
    return Response({
        'success': True,
        'data': serializer.data
    })

@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def search_products(request):
    """Search products"""
    query = request.GET.get('q', '')
    category = request.GET.get('category')
    
    if not query:
        return Response({
            'success': False,
            'message': 'Search query is required'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    # Search in multiple fields
    queryset = Product.objects.filter(
        Q(name__icontains=query) |
        Q(description__icontains=query) |
        Q(brand__icontains=query)
    )
    
    if category:
        queryset = queryset.filter(category=category)
    
    queryset = queryset.order_by('-rating', '-created_at')
    
    # Pagination
    paginator = ProductPagination()
    page = paginator.paginate_queryset(queryset, request)
    
    if page is not None:
        serializer = ProductListSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)
    
    serializer = ProductListSerializer(queryset, many=True)
    return Response({
        'success': True,
        'data': serializer.data,
        'count': queryset.count(),
        'query': query
    })

@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def brands_list(request):
    """Get all brands"""
    category = request.GET.get('category')
    
    queryset = Product.objects.all()
    if category:
        queryset = queryset.filter(category=category)
    
    brands = queryset.values_list('brand', flat=True).distinct().order_by('brand')
    
    return Response({
        'success': True,
        'data': list(brands)
    })