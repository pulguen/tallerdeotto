from django.contrib import admin
from .models import Contacto, ConfiguracionContacto

@admin.register(Contacto)
class ContactoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'email', 'telefono', 'tipo_consulta', 'fecha_creacion', 'leido', 'respondido')
    list_filter = ('leido', 'respondido', 'tipo_consulta', 'fecha_creacion')
    search_fields = ('nombre', 'email', 'mensaje', 'notas_internas')
    readonly_fields = ('fecha_creacion',)
    ordering = ('-fecha_creacion',)

@admin.register(ConfiguracionContacto)
class ConfiguracionContactoAdmin(admin.ModelAdmin):
    list_display = ('email_destino',)
    
    def has_add_permission(self, request):
        # Solo permitir un registro de configuración
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)
