from django.urls import path
from . import views

urlpatterns = [
    # Product CRUD
    path('', views.product_list_create, name='product-list-create'),
    path('<int:pk>/', views.product_detail, name='product-detail'),
    
    # Categories
    path('categories/', views.categories_list, name='categories-list'),
    path('categories/<str:category>/', views.category_products, name='category-products'),
    
    # Featured and search
    path('featured/', views.featured_products, name='featured-products'),
    path('search/', views.search_products, name='search-products'),
    
    # Brands
    path('brands/', views.brands_list, name='brands-list'),
]