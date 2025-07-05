#apps/ingresos/urls.py
from rest_framework.routers import DefaultRouter
from .views import IngresoViewSet

router = DefaultRouter()
router.register(r'', IngresoViewSet, basename='ingreso')

urlpatterns = router.urls
