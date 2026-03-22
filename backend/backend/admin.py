from django.contrib.admin import AdminSite
from django.db.models import Sum, Count
from django.utils import timezone
from datetime import timedelta


class DarasMobilesAdminSite(AdminSite):
    site_header = "DarasMobiles Admin"
    site_title = "DarasMobiles"
    index_title = "Dashboard"

    def index(self, request, extra_context=None):
        from products.models import Product
        from users.models import User
        from orders.models import Order

        # Real stats from database
        total_products = Product.objects.count()
        total_users = User.objects.filter(is_staff=False).count()
        total_orders = Order.objects.count()

        revenue_data = Order.objects.filter(
            status__in=['delivered', 'processing', 'shipped']
        ).aggregate(total=Sum('total_amount'))
        total_revenue = revenue_data['total'] or 0

        # Recent orders (last 5)
        recent_orders = Order.objects.select_related('user').order_by('-created_at')[:5]

        # Low stock products (stock <= 5)
        low_stock = Product.objects.filter(stock__lte=5).order_by('stock')[:5]

        # Orders by status
        pending_orders = Order.objects.filter(status='pending').count()
        processing_orders = Order.objects.filter(status='processing').count()

        # Products by category
        from django.db.models import Count
        category_counts = Product.objects.values('category').annotate(
            count=Count('id')
        ).order_by('-count')

        extra_context = extra_context or {}
        extra_context.update({
            'total_products': total_products,
            'total_users': total_users,
            'total_orders': total_orders,
            'total_revenue': f"{total_revenue:,.2f}",
            'recent_orders': recent_orders,
            'low_stock': low_stock,
            'pending_orders': pending_orders,
            'processing_orders': processing_orders,
            'category_counts': category_counts,
        })

        return super().index(request, extra_context)
