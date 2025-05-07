from django.contrib import admin
from .models import Ingreso

@admin.register(Ingreso)
class IngresoAdmin(admin.ModelAdmin):
    list_display  = ('fecha', 'monto', 'descripcion')
    search_fields = ('descripcion',)
    list_filter   = ('fecha',)
