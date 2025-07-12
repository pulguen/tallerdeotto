from django.db import models

class CategoriaGasto(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField(blank=True)
    creada_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre

class SubcategoriaGasto(models.Model):
    categoria = models.ForeignKey(CategoriaGasto, on_delete=models.CASCADE, related_name='subcategorias')
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    creada_en = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('categoria', 'nombre')

    def __str__(self):
        return f"{self.categoria.nombre} → {self.nombre}"

class Gasto(models.Model):
    categoria = models.ForeignKey(CategoriaGasto, on_delete=models.CASCADE)
    subcategoria = models.ForeignKey(SubcategoriaGasto, on_delete=models.SET_NULL, blank=True, null=True)
    fecha = models.DateField()
    descripcion = models.CharField(max_length=255)
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    creado_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.fecha} | {self.descripcion} | ${self.monto}"

