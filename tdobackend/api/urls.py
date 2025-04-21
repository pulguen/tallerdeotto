from django.urls import path
from .views import HealthCheck

urlpatterns = [
    path('healthz/', HealthCheck.as_view(), name='healthz'),
]
