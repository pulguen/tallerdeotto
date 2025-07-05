#apps/users/models.py
from django.db import models

# Create your models here.
# apps/users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    """Modelo de usuario extendido: puedes añadir aquí campos extra."""
    phone_number = models.CharField('teléfono', max_length=20, blank=True)
    # cualquier otro campo que necesites…

    def __str__(self):
        return self.username
