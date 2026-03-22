from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.html import format_html
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display   = ['email', 'full_name', 'username', 'role_badge',
                      'status_badge', 'is_staff', 'date_joined']
    list_filter    = ['role', 'is_active', 'is_staff', 'date_joined']
    search_fields  = ['email', 'username', 'first_name', 'last_name']
    list_per_page  = 25
    date_hierarchy = 'date_joined'
    ordering       = ['-date_joined']

    fieldsets = BaseUserAdmin.fieldsets + (
        ('Profile', {
            'fields': ('avatar', 'role', 'wishlist'),
            'classes': ('wide',),
        }),
    )

    # ── Column renderers ──────────────────────────────────────────────────────

    def full_name(self, obj):
        name = f"{obj.first_name} {obj.last_name}".strip()
        return format_html(
            '<span style="font-weight:500;color:#111827;">{}</span>',
            name or '—'
        )
    full_name.short_description = "Name"
    full_name.admin_order_field = 'first_name'

    def role_badge(self, obj):
        styles = {
            'admin': ('#fee2e2', '#991b1b'),
            'user':  ('#eff6ff', '#1d4ed8'),
        }
        bg, fg = styles.get(obj.role, ('#f3f4f6', '#374151'))
        return format_html(
            '<span style="background:{};color:{};padding:2px 10px;border-radius:20px;'
            'font-size:11px;font-weight:600;">{}</span>',
            bg, fg, obj.role.title()
        )
    role_badge.short_description = "Role"
    role_badge.admin_order_field = 'role'

    def status_badge(self, obj):
        if obj.is_active:
            return format_html(
                '<span style="background:#d1fae5;color:#065f46;padding:2px 10px;'
                'border-radius:20px;font-size:11px;font-weight:600;">{}</span>',
                'Active'
            )
        return format_html(
            '<span style="background:#fee2e2;color:#991b1b;padding:2px 10px;'
            'border-radius:20px;font-size:11px;font-weight:600;">{}</span>',
            'Inactive'
        )
    status_badge.short_description = "Status"
    status_badge.admin_order_field = 'is_active'
