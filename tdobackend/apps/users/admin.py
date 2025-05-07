# apps/users/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    # Puedes añadir aquí campos extra al listado o edición en admin:
    fieldsets = UserAdmin.fieldsets + (
      ('Extras', {'fields': ('phone_number',)}),
    )
