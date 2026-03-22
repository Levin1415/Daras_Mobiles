from django.contrib import admin
from django.utils.html import format_html
from .models import Product, ProductImage, Review


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ['image_url', 'alt_text', 'is_primary', 'image_preview']
    readonly_fields = ['image_preview']

    def image_preview(self, obj):
        if obj.image_url:
            return format_html(
                '<img src="{}" width="48" height="48" '
                'style="border-radius:6px; object-fit:cover; border:1px solid #e8eaf0;" />',
                obj.image_url
            )
        return format_html('<span style="color:#9ca3af; font-size:12px;">{}</span>', 'No image')
    image_preview.short_description = "Preview"


class ReviewInline(admin.TabularInline):
    model = Review
    extra = 0
    readonly_fields = ['rating_display', 'created_at']
    fields = ['user', 'rating', 'rating_display', 'comment', 'created_at']

    def rating_display(self, obj):
        if obj.rating:
            filled = '★' * obj.rating
            empty  = '☆' * (5 - obj.rating)
            return format_html(
                '<span style="color:#f59e0b; font-size:14px; letter-spacing:1px;">{}</span>'
                '<span style="color:#d1d5db; font-size:14px; letter-spacing:1px;">{}</span>',
                filled, empty
            )
        return '—'
    rating_display.short_description = "Stars"


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display  = ['product_id', 'name', 'brand', 'category_badge', 'price_display',
                     'discount_display', 'stock_display', 'rating_display', 'created_at']
    list_filter   = ['category', 'brand', 'created_at']
    search_fields = ['product_id', 'name', 'brand', 'description']
    inlines       = [ProductImageInline, ReviewInline]
    list_per_page = 20
    date_hierarchy = 'created_at'
    ordering      = ['-created_at']

    fieldsets = (
        ('Basic Information', {
            'fields': ('product_id', 'name', 'brand', 'category',
                       'price', 'discount_percent', 'stock', 'description'),
            'classes': ('wide',),
        }),
        ('Image', {
            'fields': ('image_url',),
            'classes': ('wide',),
        }),
        ('Rating', {
            'fields': ('rating',),
            'classes': ('wide',),
        }),
        ('Mobile Specifications', {
            'fields': ('ram', 'storage', 'processor', 'battery', 'os',
                       'display_size', 'display_resolution', 'display_type',
                       'camera_rear', 'camera_front', 'connectivity',
                       'dimensions', 'weight', 'color_options'),
            'classes': ('collapse', 'wide'),
            'description': 'Complete these fields for mobile products only.',
        }),
        ('Accessory Details', {
            'fields': ('compatible_devices', 'material', 'color', 'warranty'),
            'classes': ('collapse', 'wide'),
            'description': 'Complete these fields for accessory products only.',
        }),
    )

    # ── Column renderers ──────────────────────────────────────────────────────

    def category_badge(self, obj):
        colors = {
            'mobiles':       ('#eff6ff', '#1d4ed8'),
            'headphones':    ('#faf5ff', '#7c3aed'),
            'mobile_cases':  ('#f0fdf4', '#15803d'),
            'screen_guards': ('#fffbeb', '#b45309'),
            'chargers':      ('#fff7ed', '#c2410c'),
            'mobile_holders':('#f5f3ff', '#6d28d9'),
        }
        bg, fg = colors.get(obj.category, ('#f3f4f6', '#374151'))
        return format_html(
            '<span style="background:{};color:{};padding:2px 10px;border-radius:20px;'
            'font-size:11px;font-weight:600;">{}</span>',
            bg, fg, obj.get_category_display()
        )
    category_badge.short_description = "Category"
    category_badge.admin_order_field = 'category'

    def price_display(self, obj):
        return format_html(
            '<span style="font-weight:600;color:#111827;">${}</span>', obj.price
        )
    price_display.short_description = "Price"
    price_display.admin_order_field = 'price'

    def discount_display(self, obj):
        if obj.discount_percent > 0:
            return format_html(
                '<span style="background:#fee2e2;color:#991b1b;padding:2px 8px;'
                'border-radius:20px;font-size:11px;font-weight:600;">{}% off</span>',
                obj.discount_percent
            )
        return format_html('<span style="color:#9ca3af;font-size:12px;">{}</span>', '—')
    discount_display.short_description = "Discount"

    def stock_display(self, obj):
        if obj.stock == 0:
            return format_html(
                '<span style="background:#fee2e2;color:#991b1b;padding:2px 8px;'
                'border-radius:20px;font-size:11px;font-weight:600;">Out of stock</span>'
            )
        elif obj.stock <= 5:
            return format_html(
                '<span style="background:#fef3c7;color:#92400e;padding:2px 8px;'
                'border-radius:20px;font-size:11px;font-weight:600;">Low — {}</span>',
                obj.stock
            )
        return format_html(
            '<span style="background:#d1fae5;color:#065f46;padding:2px 8px;'
            'border-radius:20px;font-size:11px;font-weight:600;">{}</span>',
            obj.stock
        )
    stock_display.short_description = "Stock"
    stock_display.admin_order_field = 'stock'

    def rating_display(self, obj):
        return format_html(
            '<span style="color:#f59e0b;font-weight:600;">★ {}</span>', obj.rating
        )
    rating_display.short_description = "Rating"
    rating_display.admin_order_field = 'rating'
