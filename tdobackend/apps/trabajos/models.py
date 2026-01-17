# apps/trabajos/models.py
from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords


class Trabajo(models.Model):
    """
    Modelo para representar trabajos/proyectos del portfolio.
    """
    
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
    
    image = models.ImageField(
        upload_to='trabajos/%Y/%m/',
        verbose_name='Imagen',
        help_text='Imagen principal del trabajo'
    )
    
    categoria = models.CharField(
        max_length=50,
        choices=CATEGORIA_CHOICES,
        default='otro',
        verbose_name='Categoría',
        help_text='Categoría del trabajo'
    )
    
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
        return f"{self.title} ({self.get_categoria_display()})"