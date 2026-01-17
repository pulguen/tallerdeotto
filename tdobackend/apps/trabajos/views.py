# apps/trabajos/views.py
from rest_framework import viewsets, permissions
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import Trabajo
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
        
        # Filtro por categoría
        categoria = self.request.query_params.get('categoria', None)
        if categoria:
            queryset = queryset.filter(categoria=categoria)
        
        return queryset
