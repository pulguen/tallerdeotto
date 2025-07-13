from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from apps.common.permissions import IsStaffOrAdmin
from .models import Ingreso
from .serializers import IngresoSerializer

from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum
from django.db.models.functions import TruncMonth

class IngresoViewSet(viewsets.ModelViewSet):
    queryset = Ingreso.objects.all()
    serializer_class = IngresoSerializer

    def get_permissions(self):
        if self.request.method in ['GET', 'HEAD', 'OPTIONS']:
            return [IsAuthenticated()]
        return [IsStaffOrAdmin()]

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
        data = [{"mes": x["mes"].strftime("%Y-%m"), "total": x["total"]} for x in qs]
        return Response(data)
