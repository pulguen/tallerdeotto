# apps/trabajos/views.py
from rest_framework import viewsets, permissions, status
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from django.db import transaction
from .models import Trabajo, TrabajoImagen, Tag
from .serializers import TrabajoSerializer


class TrabajoViewSet(viewsets.ModelViewSet):
    """
    ViewSet para operaciones CRUD sobre Trabajo.
    
    - GET (list/retrieve): Público
    - POST/PUT/PATCH/DELETE: Solo usuarios autenticados
    """
    queryset = Trabajo.objects.all()
    serializer_class = TrabajoSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    
    def get_queryset(self):
        """
        Opcionalmente filtrar por destacados o categoría.
        """
        queryset = Trabajo.objects.all()
        
        # Filtro por destacados
        destacado = self.request.query_params.get('destacado', None)
        if destacado is not None:
            if destacado.lower() in ['true', '1', 'yes']:
                queryset = queryset.filter(destacado=True)
        
        # Filtro por categoría (Legacy)
        categoria = self.request.query_params.get('categoria', None)
        if categoria:
            queryset = queryset.filter(categoria=categoria)
            
        # Filtro por tag (Slug)
        tag_slug = self.request.query_params.get('tag', None)
        if tag_slug:
            queryset = queryset.filter(tags__slug=tag_slug)
        
        return queryset.distinct()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        try:
            with transaction.atomic():
                self.perform_create(serializer)
                trabajo = serializer.instance
                
                # Procesar Tags (tag_ids)
                tag_ids = request.data.getlist('tag_ids') if hasattr(request.data, 'getlist') else request.data.get('tag_ids', [])
                # Si llega como string único (ej: "1"), convertirlo
                if hasattr(request.data, 'getlist') and not tag_ids and 'tag_ids' in request.data:
                     # Caso formData donde a veces llega "tag_ids": "1" o "tag_ids": "[1,2]"
                     import json
                     try:
                         raw_tags = request.data.get('tag_ids')
                         if raw_tags.startswith('['):
                             tag_ids = json.loads(raw_tags)
                         else:
                             tag_ids = [int(raw_tags)]
                     except:
                         pass

                if tag_ids:
                    # Limpiar y asegurar enteros
                    cleaned_ids = []
                    for tid in tag_ids:
                        try:
                            cleaned_ids.append(int(tid))
                        except (ValueError, TypeError):
                            pass
                    if cleaned_ids:
                        trabajo.tags.set(cleaned_ids)
                
                # Procesar Imágenes Múltiples (images)
                images = request.FILES.getlist('images')
                
                # Manejar imagen principal legacy si existe y no vino en la lista
                # (aunque idealmente el frontend mandará todo en 'images')
                
                for idx, img_file in enumerate(images):
                    TrabajoImagen.objects.create(
                        trabajo=trabajo,
                        image=img_file,
                        orden=idx,
                        es_principal=(idx == 0) # Primera imagen como principal por defecto
                    )
                
                headers = self.get_success_headers(serializer.data)
                
                # Serializar de nuevo para incluir relaciones recientes
                final_serializer = self.get_serializer(trabajo)
                return Response(final_serializer.data, status=status.HTTP_201_CREATED, headers=headers)
                
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        
        try:
            with transaction.atomic():
                self.perform_update(serializer)
                trabajo = serializer.instance
                
                # Actualizar Tags
                if 'tag_ids' in request.data:
                    tag_ids = request.data.getlist('tag_ids') if hasattr(request.data, 'getlist') else request.data.get('tag_ids', [])
                    
                    # Normalizar IDs
                    cleaned_ids = []
                    
                    # Handle json string list typical in FormData
                    if hasattr(request.data, 'get') and not tag_ids:
                         raw = request.data.get('tag_ids')
                         if raw:
                             import json
                             try:
                                 cleaned_ids = json.loads(raw) if raw.startswith('[') else [int(raw)]
                             except:
                                 pass
                    else:
                        for tid in tag_ids:
                            try:
                                cleaned_ids.append(int(tid))
                            except:
                                pass
                                
                    trabajo.tags.set(cleaned_ids)

                # Agregar NUEVAS imágenes
                new_images = request.FILES.getlist('images')
                if new_images:
                    # Obtener orden máximo actual
                    current_max_order = trabajo.imagenes.count()
                    for idx, img_file in enumerate(new_images):
                        TrabajoImagen.objects.create(
                            trabajo=trabajo,
                            image=img_file,
                            orden=current_max_order + idx
                        )
                
                # NOTA: Para eliminar imágenes o reordenar, se necesitarían endpoints específicos
                # o lógica más compleja aquí. Por ahora asumimos "crianza" de nuevas.

                final_serializer = self.get_serializer(trabajo)
                return Response(final_serializer.data)

        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class TagViewSet(viewsets.ModelViewSet):
    """
    ViewSet para tags.
    """
    queryset = Tag.objects.all()
    from .serializers import TagSerializer
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
