from rest_framework import permissions

class IsAdminGroup(permissions.BasePermission):
    """Permite el acceso solo a usuarios en el grupo 'Admin'."""
    def has_permission(self, request, view):
        return (
            request.user and
            request.user.is_authenticated and
            request.user.groups.filter(name='Admin').exists()
        )

class IsStaffOrAdmin(permissions.BasePermission):
    """Permite el acceso a usuarios en 'Staff' o 'Admin'."""
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        names = set(request.user.groups.values_list('name', flat=True))
        return 'Admin' in names or 'Staff' in names
