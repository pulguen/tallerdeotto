# apps/trabajos/serializers.py
from rest_framework import serializers
from .models import Trabajo, Tag, TrabajoImagen


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'nombre', 'slug', 'color']


class TrabajoImagenSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = TrabajoImagen
        fields = ['id', 'image', 'image_url', 'es_principal', 'orden', 'descripcion']
        
    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class TrabajoSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo Trabajo.
    """
    # Read-only nested serializers
    imagenes = TrabajoImagenSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    
    # Write-only fields
    tag_ids = serializers.ListField(
        child=serializers.IntegerField(), 
        write_only=True, 
        required=False
    )
    
    # Legacy fields (kept for compatibility)
    image_url = serializers.SerializerMethodField()
    categoria_display = serializers.CharField(source='get_categoria_display', read_only=True)
    
    class Meta:
        model = Trabajo
        fields = [
            'id',
            'title',
            'description',
            # Legacy
            'image', 
            'image_url',
            'categoria',
            'categoria_display',
            # New
            'imagenes',
            'tags',
            'tag_ids',
            # Common
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
        Retorna la URL absoluta de la imagen principal (o legacy).
        """
        # Usar la propiedad imagen_principal del modelo
        img = obj.imagen_principal
        if img:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(img.url)
            return img.url
        return None
    
    def validate_title(self, value):
        if not value.strip():
            raise serializers.ValidationError("El título no puede estar vacío.")
        return value
    
    def validate_description(self, value):
        if not value.strip():
            raise serializers.ValidationError("La descripción no puede estar vacía.")
        return value
