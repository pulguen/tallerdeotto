# apps/users/apps.py
from django.apps import AppConfig

class UsersConfig(AppConfig):
    name = 'apps.users'
    verbose_name = 'Users'

    def ready(self):
        # Conectamos la señal *dentro* de ready, cuando las apps ya están cargadas
        from django.db.models.signals import post_migrate
        post_migrate.connect(self.create_default_groups, sender=self)

    @staticmethod
    def create_default_groups(sender, **kwargs):
        # ---> importamos aquí, no al nivel de módulo <---
        from django.contrib.auth.models import Group, Permission
        from django.contrib.contenttypes.models import ContentType

        group_defs = {
            'Admin': {
                'models': [('users', 'customuser'), ('ingresos', 'ingreso')],
                'perms': ['add', 'change', 'delete', 'view'],
            },
            'Staff': {
                'models': [('ingresos', 'ingreso')],
                'perms': ['add', 'change', 'view'],
            },
            'Cliente': {
                'models': [('ingresos', 'ingreso')],
                'perms': ['view'],
            },
        }

        for group_name, cfg in group_defs.items():
            group, _ = Group.objects.get_or_create(name=group_name)
            for app_label, model in cfg['models']:
                ct = ContentType.objects.get(app_label=app_label, model=model)
                for action in cfg['perms']:
                    codename = f"{action}_{model}"
                    try:
                        perm = Permission.objects.get(content_type=ct, codename=codename)
                        group.permissions.add(perm)
                    except Permission.DoesNotExist:
                        continue
