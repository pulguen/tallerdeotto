# apps/trabajos/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TrabajoViewSet, TagViewSet

router = DefaultRouter()
router.register(r'', TrabajoViewSet, basename='trabajo')
router.register(r'tags', TagViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
