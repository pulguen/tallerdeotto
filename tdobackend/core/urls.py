# core/urls.py

from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

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
]
