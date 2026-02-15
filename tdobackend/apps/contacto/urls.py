from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContactoViewSet, ConfiguracionContactoViewSet

router = DefaultRouter()
router.register(r'mensajes', ContactoViewSet, basename='mensajes-contacto')
router.register(r'configuracion', ConfiguracionContactoViewSet, basename='configuracion-contacto')

urlpatterns = [
    path('', include(router.urls)),
]
