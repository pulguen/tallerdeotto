# apps/trabajos/admin.py
from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin
from .models import Trabajo


@admin.register(Trabajo)
class TrabajoAdmin(SimpleHistoryAdmin):
    """
    Configuración del admin para Trabajo.
    """
    list_display = ['title', 'categoria', 'cliente', 'fecha_realizacion', 'destacado', 'orden', 'creado_en']
    list_filter = ['categoria', 'destacado', 'fecha_realizacion']
    search_fields = ['title', 'description', 'cliente']
    list_editable = ['destacado', 'orden']
    ordering = ['orden', '-fecha_realizacion']
    date_hierarchy = 'fecha_realizacion'
    
    fieldsets = (
        ('Información Principal', {
            'fields': ('title', 'description', 'image')
        }),
        ('Clasificación', {
            'fields': ('categoria', 'cliente', 'fecha_realizacion')
        }),
        ('Configuración', {
            'fields': ('destacado', 'orden')
        }),
    )
