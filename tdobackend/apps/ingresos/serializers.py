#apps/ingresos/serializers.py
from rest_framework import serializers
from .models import Ingreso

class IngresoSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Ingreso
        fields = ['id', 'monto', 'fecha', 'descripcion', 'creado_en', 'actualizado_en']
