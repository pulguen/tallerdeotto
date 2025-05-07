from rest_framework.routers import DefaultRouter
from .views import IngresoViewSet

router = DefaultRouter()
router.register(r'ingresos', IngresoViewSet, basename='ingreso')

urlpatterns = router.urls
