#apps/users/urls.py
from django.urls import path
from .views import (
    CookieTokenObtainPairView,
    CookieTokenRefreshView,
    RegisterView,
    ProfileView,
    LogoutAndBlacklistView,
)

urlpatterns = [
    path('token/',         CookieTokenObtainPairView.as_view(),   name='token_obtain_pair'),
    path('token/refresh/', CookieTokenRefreshView.as_view(),      name='token_refresh'),

    path('register/',      RegisterView.as_view(),                name='user-register'),
    path('me/',            ProfileView.as_view(),                 name='user-profile'),

    path('logout/',        LogoutAndBlacklistView.as_view(),      name='user-logout'),
]
