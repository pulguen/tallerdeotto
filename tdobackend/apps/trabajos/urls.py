# apps/trabajos/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TrabajoViewSet

router = DefaultRouter()
router.register(r'', TrabajoViewSet, basename='trabajo')

urlpatterns = [
    path('', include(router.urls)),
]
