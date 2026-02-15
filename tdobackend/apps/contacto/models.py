from django.db import models

class Contacto(models.Model):
    TIPO_CONSULTA_CHOICES = [
        ('presupuesto', 'Quiero un presupuesto'),
        ('pedido', 'Consulta sobre un pedido'),
        ('info', 'Quiero info sobre servicios'),
        ('otro', 'Otro'),
    ]

    nombre = models.CharField(max_length=255)
    email = models.EmailField(blank=True, null=True)
    telefono = models.CharField(max_length=50, blank=True, null=True)
    tipo_consulta = models.CharField(max_length=50, choices=TIPO_CONSULTA_CHOICES, default='presupuesto')
    mensaje = models.TextField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    leido = models.BooleanField(default=False)
    respondido = models.BooleanField(default=False)
    notas_internas = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name = 'Contacto'
        verbose_name_plural = 'Contactos'
        ordering = ['-fecha_creacion']

    def __str__(self):
        return f"{self.nombre} - {self.tipo_consulta} ({self.fecha_creacion.strftime('%d/%m/%Y')})"

class ConfiguracionContacto(models.Model):
    email_destino = models.EmailField(help_text="Email a donde se enviarán las notificaciones de nuevos contactos.")
    
    class Meta:
        verbose_name = 'Configuración de Contacto'
        verbose_name_plural = 'Configuraciones de Contacto'

    def __str__(self):
        return f"Configuración: {self.email_destino}"
