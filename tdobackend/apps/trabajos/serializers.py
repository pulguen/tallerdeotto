# apps/trabajos/serializers.py
from rest_framework import serializers
from .models import Trabajo


class TrabajoSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo Trabajo.
    """
    image_url = serializers.SerializerMethodField()
    categoria_display = serializers.CharField(source='get_categoria_display', read_only=True)
    
    class Meta:
        model = Trabajo
        fields = [
            'id',
            'title',
            'description',
            'image',
            'image_url',
            'categoria',
            'categoria_display',
            'fecha_realizacion',
            'cliente',
            'destacado',
            'orden',
            'creado_en',
            'actualizado_en',
        ]
        read_only_fields = ['id', 'creado_en', 'actualizado_en']
    
    def get_image_url(self, obj):
        """
        Retorna la URL absoluta de la imagen.
        """
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None
    
    def validate_title(self, value):
        """
        Validar que el título no esté vacío.
        """
        if not value.strip():
            raise serializers.ValidationError("El título no puede estar vacío.")
        return value
    
    def validate_description(self, value):
        """
        Validar que la descripción no esté vacía.
        """
        if not value.strip():
            raise serializers.ValidationError("La descripción no puede estar vacía.")
        return value
