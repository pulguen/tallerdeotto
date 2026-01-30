# apps/trabajos/models.py
from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords



class Tag(models.Model):
    nombre = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(unique=True)
    color = models.CharField(max_length=7, default='#06b6d4')  # Hex color
    
    class Meta:
        ordering = ['nombre']

    def __str__(self):
        return self.nombre


class Trabajo(models.Model):
    """
    Modelo para representar trabajos/proyectos del portfolio.
    """
    
    # DEPRECADOS: Mantener temporalmente para migración
    CATEGORIA_CHOICES = [
        ('diseno_grafico', 'Diseño Gráfico'),
        ('social_media', 'Social Media'),
        ('diseno_web', 'Diseño Web'),
        ('desarrollo_software', 'Desarrollo de Software'),
        ('estampado', 'Estampado'),
        ('impresiones', 'Impresiones'),
        ('branding', 'Branding'),
        ('packaging', 'Packaging'),
        ('otro', 'Otro'),
    ]
    
    history = HistoricalRecords()
    
    title = models.CharField(
        max_length=255,
        verbose_name='Título',
        help_text='Título del trabajo o proyecto'
    )
    
    description = models.TextField(
        verbose_name='Descripción',
        help_text='Descripción detallada del trabajo realizado'
    )
    
    # Deprecado -> se usará TrabajoImagen
    image = models.ImageField(
        upload_to='trabajos/%Y/%m/',
        verbose_name='Imagen (Legacy)',
        help_text='Imagen principal del trabajo (Legacy)',
        blank=True,
        null=True
    )
    
    # Deprecado -> se usarán tags
    categoria = models.CharField(
        max_length=50,
        choices=CATEGORIA_CHOICES,
        default='otro',
        verbose_name='Categoría (Legacy)',
        help_text='Categoría del trabajo (Legacy)',
        blank=True
    )

    tags = models.ManyToManyField(Tag, related_name='trabajos', blank=True)
    
    fecha_realizacion = models.DateField(
        default=timezone.now,
        verbose_name='Fecha de Realización',
        help_text='Fecha en que se realizó el trabajo'
    )
    
    cliente = models.CharField(
        max_length=255,
        blank=True,
        verbose_name='Cliente',
        help_text='Nombre del cliente (opcional)'
    )
    
    destacado = models.BooleanField(
        default=False,
        verbose_name='Destacado',
        help_text='Marcar si el trabajo debe aparecer destacado'
    )
    
    orden = models.IntegerField(
        default=0,
        verbose_name='Orden',
        help_text='Orden de visualización (menor número = mayor prioridad)'
    )
    
    creado_en = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Creado en'
    )
    
    actualizado_en = models.DateTimeField(
        auto_now=True,
        verbose_name='Actualizado en'
    )
    
    class Meta:
        verbose_name = 'Trabajo'
        verbose_name_plural = 'Trabajos'
        ordering = ['orden', '-fecha_realizacion', '-creado_en']
    
    def __str__(self):
        return f"{self.title}"

    @property
    def imagen_principal(self):
        """Retorna la imagen marcada como principal o la primera"""
        principal = self.imagenes.filter(es_principal=True).first()
        if principal:
            return principal.image
        first_img = self.imagenes.first()
        if first_img:
            return first_img.image
        return self.image  # Fallback a imagen legacy


class TrabajoImagen(models.Model):
    trabajo = models.ForeignKey(Trabajo, related_name='imagenes', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='trabajos/%Y/%m/')
    es_principal = models.BooleanField(default=False)
    orden = models.IntegerField(default=0)
    descripcion = models.CharField(max_length=255, blank=True)
    
    class Meta:
        ordering = ['orden', '-id']
