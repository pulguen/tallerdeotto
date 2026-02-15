from django.core.mail import send_mail
from django.conf import settings
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Contacto, ConfiguracionContacto
from .serializers import ContactoSerializer, ContactoAdminSerializer, ConfiguracionContactoSerializer

class ContactoViewSet(viewsets.ModelViewSet):
    queryset = Contacto.objects.all()
    
    def get_serializer_class(self):
        if self.request.user.is_staff:
            return ContactoAdminSerializer
        return ContactoSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    def perform_create(self, serializer):
        instance = serializer.save()
        
        # Intentar enviar email de notificación
        self.send_notification_email(instance)

    def send_notification_email(self, instance):
        try:
            config = ConfiguracionContacto.objects.first()
            if config and config.email_destino:
                subject = f"Nuevo contacto: {instance.nombre} - {instance.get_tipo_consulta_display()}"
                message = (
                    f"Recibiste un nuevo mensaje desde el sitio web:\n\n"
                    f"Nombre: {instance.nombre}\n"
                    f"Email: {instance.email}\n"
                    f"Teléfono: {instance.telefono}\n"
                    f"Tipo de Consulta: {instance.get_tipo_consulta_display()}\n\n"
                    f"Mensaje:\n{instance.mensaje}\n"
                )
                send_mail(
                    subject,
                    message,
                    settings.DEFAULT_FROM_EMAIL,
                    [config.email_destino],
                    fail_silently=True,
                )
        except Exception as e:
            # Podríamos loguear el error aquí
            print(f"Error enviando mail de notificación: {e}")

class ConfiguracionContactoViewSet(viewsets.ModelViewSet):
    queryset = ConfiguracionContacto.objects.all()
    serializer_class = ConfiguracionContactoSerializer
    permission_classes = [permissions.IsAdminUser()]

    def list(self, request, *args, **kwargs):
        # Asegurarnos de que siempre haya una configuración, o al menos devolver el objeto único
        config = ConfiguracionContacto.objects.first()
        if not config:
            return Response({"detail": "No hay configuración establecida."}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(config)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        # Solo permitir una configuración
        if ConfiguracionContacto.objects.exists():
            instance = ConfiguracionContacto.objects.first()
            serializer = self.get_serializer(instance, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        return super().create(request, *args, **kwargs)
