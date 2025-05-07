# apps/ingresos/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from apps.common.permissions import IsStaffOrAdmin
from .models import Ingreso
from .serializers import IngresoSerializer

class IngresoViewSet(viewsets.ModelViewSet):
    queryset = Ingreso.objects.all()
    serializer_class = IngresoSerializer

    def get_permissions(self):
        # Lecturas (GET/HEAD/OPTIONS) → cualquier usuario autenticado
        if self.request.method in ['GET', 'HEAD', 'OPTIONS']:
            return [IsAuthenticated()]
        # Creación, actualización, borrado → solo Staff o Admin
        return [IsStaffOrAdmin()]
