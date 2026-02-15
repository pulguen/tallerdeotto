from rest_framework import serializers
from .models import Contacto, ConfiguracionContacto

class ContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacto
        fields = '__all__'
        read_only_fields = ('fecha_creacion', 'leido', 'respondido', 'notas_internas')

class ContactoAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacto
        fields = '__all__'

class ConfiguracionContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConfiguracionContacto
        fields = '__all__'
