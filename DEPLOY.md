# Deploy inicial

Este proyecto queda mejor desplegado con esta topologia:

- `Nginx` sirviendo el build de `tdofrontend/dist`
- `Nginx` proxyeando `/api/` y `/admin/` hacia Django
- `Nginx` sirviendo `/media/` desde un directorio persistente
- `Gunicorn` ejecutando Django

## 1. Frontend

Desde `tdofrontend/`:

```bash
npm install
npm run build
```

El build queda en `tdofrontend/dist/`.

Variables:

```bash
VITE_API_BASE_URL=/api/
VITE_DEV_API_TARGET=http://127.0.0.1:8001
```

En produccion, si frontend y backend comparten dominio, `VITE_API_BASE_URL=/api/` es suficiente.

## 2. Backend

Desde `tdobackend/`:

```bash
venv\Scripts\python.exe -m pip install -r requirements.prod.txt
venv\Scripts\python.exe manage.py migrate
venv\Scripts\python.exe manage.py collectstatic --noinput
venv\Scripts\python.exe manage.py check --deploy
```

Copiar `tdobackend/.env.example` a `tdobackend/.env` y completar valores reales.

Minimo recomendado:

- `DJANGO_DEBUG=False`
- `DJANGO_SECRET_KEY` unica y secreta
- `DJANGO_ALLOWED_HOSTS` con el dominio real
- `DJANGO_CORS_ALLOWED_ORIGINS` y `DJANGO_CSRF_TRUSTED_ORIGINS` con HTTPS real
- `DJANGO_MEDIA_ROOT` apuntando a storage persistente
- `DATABASE_URL` de PostgreSQL o bloque `DB_*`

Comando de arranque sugerido:

```bash
venv\Scripts\gunicorn.exe core.wsgi:application --bind 127.0.0.1:8001
```

Ejemplo PostgreSQL:

```bash
DATABASE_URL=postgresql://tallerdeotto:change-me@127.0.0.1:5432/tallerdeotto
```

## 3. Proxy

El frontend usa rutas SPA con `BrowserRouter`, asi que Nginx debe hacer fallback a `index.html`.

Tambien debe enrutar:

- `/api/` -> Gunicorn/Django
- `/admin/` -> Gunicorn/Django
- `/media/` -> directorio persistente

## 4. Riesgos pendientes

- Hoy sigue habiendo `media/` y certificados locales dentro del repo.
- SQLite puede servir para una salida muy chica, pero para produccion seria conviene PostgreSQL.
- El bundle frontend actual es grande; no bloquea deploy inicial, pero si performance.

## 5. Archivos de ejemplo

- `deploy/gunicorn.service.example`
- `deploy/nginx.tallerdeotto.conf.example`
