"""
Django settings for core project.
"""
from datetime import timedelta
import os
from pathlib import Path
from urllib.parse import urlparse

BASE_DIR = Path(__file__).resolve().parent.parent


def load_env_file(env_path):
    if not env_path.exists():
        return

    for raw_line in env_path.read_text(encoding='utf-8').splitlines():
        line = raw_line.strip()
        if not line or line.startswith('#') or '=' not in line:
            continue

        key, value = line.split('=', 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        os.environ.setdefault(key, value)


def env_bool(name, default=False):
    value = os.getenv(name)
    if value is None:
        return default
    return value.strip().lower() in {'1', 'true', 'yes', 'on'}


def env_list(name, default=''):
    raw_value = os.getenv(name)
    if raw_value is None:
        raw_value = default
    return [item.strip() for item in raw_value.split(',') if item.strip()]


def parse_database_url(url):
    parsed = urlparse(url)
    engine_map = {
        'postgres': 'django.db.backends.postgresql',
        'postgresql': 'django.db.backends.postgresql',
        'pgsql': 'django.db.backends.postgresql',
        'sqlite': 'django.db.backends.sqlite3',
    }
    engine = engine_map.get(parsed.scheme)
    if not engine:
        raise ValueError(f'Unsupported DATABASE_URL scheme: {parsed.scheme}')

    if engine == 'django.db.backends.sqlite3':
        db_path = parsed.path or ''
        if db_path.startswith('/'):
            db_path = db_path[1:]
        return {
            'ENGINE': engine,
            'NAME': db_path or str(BASE_DIR / 'db.sqlite3'),
        }

    return {
        'ENGINE': engine,
        'NAME': parsed.path.lstrip('/'),
        'USER': parsed.username or '',
        'PASSWORD': parsed.password or '',
        'HOST': parsed.hostname or 'localhost',
        'PORT': str(parsed.port or ''),
    }


load_env_file(BASE_DIR / '.env')

SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'django-insecure-dev-only-change-me')
DEBUG = env_bool('DJANGO_DEBUG', True)

default_allowed_hosts = 'localhost,127.0.0.1,192.168.1.37'
ALLOWED_HOSTS = env_list('DJANGO_ALLOWED_HOSTS', default_allowed_hosts)

# Application definition
INSTALLED_APPS = [
    'corsheaders',
    'rest_framework',
    'rest_framework_simplejwt.token_blacklist',
    'django_password_validators',
    'axes',
    'simple_history',
    'django_extensions',

    'apps.users.apps.UsersConfig',
    'apps.ingresos',
    'apps.gastos',
    'apps.trabajos',
    'apps.contacto',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

if DEBUG:
    INSTALLED_APPS.append('sslserver')

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'axes.middleware.AxesMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'simple_history.middleware.HistoryRequestMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

database_url = os.getenv('DATABASE_URL')

if database_url:
    DATABASES = {
        'default': parse_database_url(database_url)
    }
else:
    database_engine = os.getenv('DB_ENGINE', 'django.db.backends.sqlite3')
    database_name = os.getenv('DB_NAME', str(BASE_DIR / 'db.sqlite3'))

    DATABASES = {
        'default': {
            'ENGINE': database_engine,
            'NAME': database_name,
        }
    }

    if database_engine != 'django.db.backends.sqlite3':
        DATABASES['default'].update({
            'USER': os.getenv('DB_USER', ''),
            'PASSWORD': os.getenv('DB_PASSWORD', ''),
            'HOST': os.getenv('DB_HOST', 'localhost'),
            'PORT': os.getenv('DB_PORT', ''),
        })

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
        'OPTIONS': {
            'user_attributes': ('username', 'email'),
        }
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {
            'min_length': 10,
        }
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
    {
        'NAME': (
            'django_password_validators'
            '.password_character_requirements.password_validation'
            '.PasswordCharacterValidator'
        ),
        'OPTIONS': {
            'min_length_upper': 1,
            'min_length_lower': 1,
            'min_length_digit': 1,
            'min_length_special': 1,
            'special_characters': "@$!%*?&",
        }
    },
]

LANGUAGE_CODE = os.getenv('DJANGO_LANGUAGE_CODE', 'es-ar')
TIME_ZONE = os.getenv('DJANGO_TIME_ZONE', 'America/Argentina/Buenos_Aires')
USE_I18N = True
USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = os.getenv('DJANGO_STATIC_ROOT', str(BASE_DIR / 'staticfiles'))
static_dir = BASE_DIR / 'static'
STATICFILES_DIRS = [str(static_dir)] if static_dir.exists() else []

# Media files (uploads)
MEDIA_URL = os.getenv('DJANGO_MEDIA_URL', '/media/')
MEDIA_ROOT = os.getenv('DJANGO_MEDIA_ROOT', str(BASE_DIR / 'media'))

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CORS
CORS_ALLOWED_ORIGINS = env_list(
    'DJANGO_CORS_ALLOWED_ORIGINS',
    'http://localhost:5173,http://localhost:5174,http://192.168.1.37:5173,http://192.168.1.37:5174,https://127.0.0.1:8000,https://tallerdeotto.com'
)
CORS_ALLOW_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
CORS_ALLOW_HEADERS = ['content-type', 'authorization', 'x-csrftoken']
CORS_ALLOW_CREDENTIALS = True

# REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ),
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '1000/min',
        'user': '10000/min',
    },
}

# Custom User
AUTH_USER_MODEL = 'users.CustomUser'

# Simple JWT
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'AUTH_COOKIE': 'refresh_token',
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
}

# CSRF
CSRF_TRUSTED_ORIGINS = env_list(
    'DJANGO_CSRF_TRUSTED_ORIGINS',
    'http://localhost:5173,http://localhost:5174,http://192.168.1.37:5173,http://192.168.1.37:5174,https://tallerdeotto.com'
)
CSRF_COOKIE_SECURE = env_bool('DJANGO_CSRF_COOKIE_SECURE', not DEBUG)
CSRF_COOKIE_HTTPONLY = False
CSRF_COOKIE_SAMESITE = os.getenv('DJANGO_CSRF_COOKIE_SAMESITE', 'Lax')

# Forzar HTTPS solo en produccion
SECURE_SSL_REDIRECT = env_bool('DJANGO_SECURE_SSL_REDIRECT', not DEBUG)
SECURE_HSTS_SECONDS = int(os.getenv('DJANGO_SECURE_HSTS_SECONDS', str(60 * 60 * 24 * 30)))
SECURE_HSTS_INCLUDE_SUBDOMAINS = env_bool('DJANGO_SECURE_HSTS_INCLUDE_SUBDOMAINS', True)
SECURE_HSTS_PRELOAD = env_bool('DJANGO_SECURE_HSTS_PRELOAD', True)

SESSION_COOKIE_SECURE = env_bool('DJANGO_SESSION_COOKIE_SECURE', not DEBUG)
SESSION_COOKIE_SAMESITE = os.getenv('DJANGO_SESSION_COOKIE_SAMESITE', 'Lax')

# Proxy header (p.ej. Heroku / nginx)
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_REFERRER_POLICY = 'no-referrer-when-downgrade'

# django-axes (bloqueo de logins abusivos)
AXES_FAILURE_LIMIT = 20
AXES_COOLOFF_TIME = 0.01

# Crear carpeta logs/ si no existe y configurar logging
LOG_DIR = BASE_DIR / 'logs'
LOG_DIR.mkdir(exist_ok=True)

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'security_file': {
            'class': 'logging.FileHandler',
            'filename': LOG_DIR / 'security.log',
        },
    },
    'loggers': {
        'django.security.*': {
            'handlers': ['security_file'],
            'level': 'WARNING',
            'propagate': True,
        },
    },
}

AUTHENTICATION_BACKENDS = [
    'axes.backends.AxesStandaloneBackend',
    'django.contrib.auth.backends.ModelBackend',
]

# Email (SMTP / Notifications)
EMAIL_BACKEND = os.getenv('EMAIL_BACKEND', 'django.core.mail.backends.smtp.EmailBackend')
EMAIL_HOST = os.getenv('EMAIL_HOST', '')
EMAIL_PORT = int(os.getenv('EMAIL_PORT', '587'))
EMAIL_USE_TLS = env_bool('EMAIL_USE_TLS', True)
EMAIL_USE_SSL = env_bool('EMAIL_USE_SSL', False)
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER', '')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD', '')
EMAIL_TIMEOUT = int(os.getenv('EMAIL_TIMEOUT', '20'))
DEFAULT_FROM_EMAIL = os.getenv(
    'DEFAULT_FROM_EMAIL',
    EMAIL_HOST_USER if EMAIL_HOST_USER else 'no-reply@tallerdeotto.com'
)
