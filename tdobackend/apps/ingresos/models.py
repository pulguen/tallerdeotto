# apps/ingresos/models.py
from django.db import models

# Create your models here.
from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords

class Ingreso(models.Model):
    history = HistoricalRecords()

    cliente = models.CharField(
        max_length=255,
        blank=True,
        help_text="Nombre del Cliente"
    )

    monto = models.DecimalField(
        max_digits=10, decimal_places=2,
        help_text="Cantidad de dinero ingresada"
    )
    fecha = models.DateField(
        default=timezone.now,
        help_text="Fecha del ingreso"
    )

    descripcion = models.CharField(
        max_length=255,
        blank=True,
        help_text="Concepto o detalle del ingreso"
    )
    creado_en = models.DateTimeField(
        auto_now_add=True,
        help_text="Fecha y hora de creación del registro"
    )
    actualizado_en = models.DateTimeField(
        auto_now=True,
        help_text="Fecha y hora de última modificación"
    )

    def __str__(self):
        return f"{self.fecha}: {self.monto} — {self.descripcion}"