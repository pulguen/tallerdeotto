from django.contrib import admin
from .models import CategoriaGasto, SubcategoriaGasto, Gasto

admin.site.register(CategoriaGasto)
admin.site.register(SubcategoriaGasto)
admin.site.register(Gasto)
