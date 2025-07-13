#apps/gastos/urls.py
from rest_framework.routers import DefaultRouter
from .views import CategoriaGastoViewSet, SubcategoriaGastoViewSet, GastoViewSet

router = DefaultRouter()
router.register(r'categorias-gasto', CategoriaGastoViewSet)
router.register(r'subcategorias-gasto', SubcategoriaGastoViewSet)
router.register(r'gastos', GastoViewSet)

urlpatterns = router.urls
