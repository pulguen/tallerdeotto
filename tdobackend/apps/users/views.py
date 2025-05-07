# apps/users/views.py

from django.conf import settings
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .models import CustomUser
from .serializers import UserSerializer


# Helpers para leer settings.SIMPLE_JWT
def get_auth_cookie_name():
    return settings.SIMPLE_JWT.get('AUTH_COOKIE', 'refresh_token')

def get_refresh_lifetime():
    return settings.SIMPLE_JWT.get('REFRESH_TOKEN_LIFETIME')


class CookieTokenObtainPairView(TokenObtainPairView):
    """
    POST /api/users/token/
    - Devuelve `access` en JSON.
    - Envía `refresh` en cookie HttpOnly.
    """
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        refresh = response.data.get('refresh')
        if refresh:
            response.set_cookie(
                key=get_auth_cookie_name(),
                value=refresh,
                expires=get_refresh_lifetime(),
                httponly=True,
                secure=not settings.DEBUG,
                samesite='Lax',
            )
            response.data.pop('refresh', None)
        return response


class CookieTokenRefreshView(TokenRefreshView):
    """
    POST /api/users/token/refresh/
    - Lee el `refresh` desde la cookie y devuelve nuevo `access`.
    - Rota el refresh en la cookie.
    """
    def post(self, request, *args, **kwargs):
        cookie_name = get_auth_cookie_name()
        token = request.COOKIES.get(cookie_name)
        request.data['refresh'] = token
        response = super().post(request, *args, **kwargs)

        new_refresh = response.data.get('refresh')
        if new_refresh:
            response.set_cookie(
                key=cookie_name,
                value=new_refresh,
                expires=get_refresh_lifetime(),
                httponly=True,
                secure=not settings.DEBUG,
                samesite='Lax',
            )
            response.data.pop('refresh', None)
        return response


class RegisterView(generics.CreateAPIView):
    """
    POST /api/users/register/
    - Crea un nuevo usuario.
    """
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class ProfileView(generics.RetrieveUpdateAPIView):
    """
    GET/PUT /api/users/me/
    - Recupera y actualiza los datos del usuario autenticado.
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class LogoutAndBlacklistView(APIView):
    """
    POST /api/users/logout/
    - Revoca (blacklist) el refresh token en servidor.
    - Expira la cookie de refresh en cliente.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        cookie_name = get_auth_cookie_name()
        token = request.COOKIES.get(cookie_name)
        # Blacklist del refresh token
        if token:
            try:
                RefreshToken(token).blacklist()
            except Exception:
                pass

        # Respuesta de logout
        response = Response({'detail': 'Logged out'}, status=status.HTTP_200_OK)
        response.delete_cookie(
            key=cookie_name,
            secure=not settings.DEBUG,
            samesite='Lax'
        )
        return response
