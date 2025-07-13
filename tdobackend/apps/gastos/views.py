from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import CategoriaGasto, SubcategoriaGasto, Gasto
from .serializers import CategoriaGastoSerializer, SubcategoriaGastoSerializer, GastoSerializer

from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum
from django.db.models.functions import TruncMonth

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

    @action(detail=False, methods=["get"])
    def total(self, request):
        total = self.get_queryset().aggregate(total=Sum("monto"))["total"] or 0
        return Response({"total": total})

    @action(detail=False, methods=["get"])
    def resumen_mensual(self, request):
        qs = (self.get_queryset()
              .annotate(mes=TruncMonth("fecha"))
              .values("mes")
              .annotate(total=Sum("monto"))
              .order_by("mes"))
        # Formatear "mes" como YYYY-MM
        data = [{"mes": x["mes"].strftime("%Y-%m"), "total": x["total"]} for x in qs]
        return Response(data)
