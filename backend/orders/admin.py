from django.contrib import admin
from django.utils.html import format_html
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model  = OrderItem
    extra  = 0
    fields = ['product', 'quantity', 'price', 'line_total']
    readonly_fields = ['line_total']

    def line_total(self, obj):
        if obj.quantity and obj.price:
            return format_html(
                '<span style="font-weight:600;color:#111827;">${:.2f}</span>',
                obj.quantity * obj.price
            )
        return '—'
    line_total.short_description = "Line Total"


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display   = ['order_number', 'customer', 'total_display',
                      'status_badge', 'payment_method', 'created_at']
    list_filter    = ['status', 'payment_method', 'created_at']
    search_fields  = ['user__email', 'user__first_name', 'user__last_name']
    inlines        = [OrderItemInline]
    list_per_page  = 20
    date_hierarchy = 'created_at'
    ordering       = ['-created_at']
    readonly_fields = ['created_at', 'updated_at']

    fieldsets = (
        ('Order Information', {
            'fields': ('user', 'total_amount', 'status', 'payment_method'),
            'classes': ('wide',),
        }),
        ('Shipping Address', {
            'fields': ('street', 'city', 'state', 'zip_code', 'country'),
            'classes': ('wide',),
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )

    # ── Column renderers ──────────────────────────────────────────────────────

    def order_number(self, obj):
        return format_html(
            '<span style="font-family:monospace;font-weight:600;color:#6366f1;">#{}</span>',
            obj.id
        )
    order_number.short_description = "Order"
    order_number.admin_order_field = 'id'

    def customer(self, obj):
        name = obj.user.get_full_name() or obj.user.email
        return format_html(
            '<span style="font-weight:500;color:#111827;">{}</span>'
            '<br><span style="font-size:11px;color:#6b7280;">{}</span>',
            name, obj.user.email
        )
    customer.short_description = "Customer"
    customer.admin_order_field = 'user__first_name'

    def total_display(self, obj):
        return format_html(
            '<span style="font-weight:600;color:#111827;">${}</span>',
            obj.total_amount
        )
    total_display.short_description = "Total"
    total_display.admin_order_field = 'total_amount'

    def status_badge(self, obj):
        styles = {
            'pending':    ('#fef3c7', '#92400e'),
            'processing': ('#dbeafe', '#1e40af'),
            'shipped':    ('#ede9fe', '#5b21b6'),
            'delivered':  ('#d1fae5', '#065f46'),
            'cancelled':  ('#fee2e2', '#991b1b'),
        }
        bg, fg = styles.get(obj.status, ('#f3f4f6', '#374151'))
        return format_html(
            '<span style="background:{};color:{};padding:2px 10px;border-radius:20px;'
            'font-size:11px;font-weight:600;">{}</span>',
            bg, fg, obj.status.title()
        )
    status_badge.short_description = "Status"
    status_badge.admin_order_field = 'status'
