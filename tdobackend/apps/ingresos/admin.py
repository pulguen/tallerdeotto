from django.contrib import admin
from .models import Ingreso

@admin.register(Ingreso)
class IngresoAdmin(admin.ModelAdmin):
    list_display  = ('fecha','cliente', 'monto', 'descripcion')
    search_fields = ('descripcion','cliente')
    list_filter   = ('fecha',)
