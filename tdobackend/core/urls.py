# core/urls.py

from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from django.conf import settings
from django.conf.urls.static import static

def health_check(request):
    return HttpResponse("OK")

urlpatterns = [
    # Admin de Django
    path('admin/', admin.site.urls),

    # Health-check sencillo
    path('healthz/', health_check, name='health_check'),

    # Auth & users (todas las rutas JWT cookie, register y profile)
    path('api/users/', include('apps.users.urls')),

    # Endpoints de ingresos
    path('api/ingresos/', include('apps.ingresos.urls')),

    # Endpoints de gastos
    path('api/gastos/', include('apps.gastos.urls')),

    # Endpoints de trabajos/portfolio
    path('api/trabajos/', include('apps.trabajos.urls')),
    
    # Endpoints de contacto
    path('api/contacto/', include('apps.contacto.urls')),

]

# Servir archivos media en desarrollo
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

