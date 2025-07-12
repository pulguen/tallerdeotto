from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import CategoriaGasto, SubcategoriaGasto, Gasto
from .serializers import CategoriaGastoSerializer, SubcategoriaGastoSerializer, GastoSerializer

class CategoriaGastoViewSet(viewsets.ModelViewSet):
    queryset = CategoriaGasto.objects.all().order_by('nombre')
    serializer_class = CategoriaGastoSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]


class SubcategoriaGastoViewSet(viewsets.ModelViewSet):
    queryset = SubcategoriaGasto.objects.all().order_by('nombre')
    serializer_class = SubcategoriaGastoSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]


class GastoViewSet(viewsets.ModelViewSet):
    queryset = Gasto.objects.all().order_by('-fecha')
    serializer_class = GastoSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
