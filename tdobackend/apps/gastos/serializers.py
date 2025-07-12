from rest_framework import serializers
from .models import CategoriaGasto, SubcategoriaGasto, Gasto

class CategoriaGastoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaGasto
        fields = '__all__'


class SubcategoriaGastoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubcategoriaGasto
        fields = '__all__'


class GastoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gasto
        fields = '__all__'
