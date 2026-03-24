# Primer deploy

## 1. Servidor

- Instalar `nginx`
- Instalar Python y herramientas de compilacion necesarias
- Crear directorios persistentes:
  - `/var/www/tallerdeotto/media`
  - `/var/www/tallerdeotto/staticfiles`

## 2. Codigo

- Clonar el repo en `/var/www/tallerdeotto`
- Entrar a `tdobackend/`
- Crear o actualizar `venv`
- Instalar dependencias:

```bash
venv/bin/pip install -r requirements.prod.txt
```

## 3. Variables de entorno

- Copiar `tdobackend/.env.example` a `tdobackend/.env`
- Completar como minimo:
  - `DJANGO_SECRET_KEY`
  - `DJANGO_DEBUG=False`
  - `DJANGO_ALLOWED_HOSTS`
  - `DJANGO_CORS_ALLOWED_ORIGINS`
  - `DJANGO_CSRF_TRUSTED_ORIGINS`
  - `DJANGO_STATIC_ROOT=/var/www/tallerdeotto/staticfiles`
  - `DJANGO_MEDIA_ROOT=/var/www/tallerdeotto/media`
  - `DATABASE_URL` o bloque `DB_*`

## 4. Base de datos

- Inicial minimo viable:
  - usar SQLite solo si queres una salida chica y controlada
- Recomendado:
  - migrar a PostgreSQL antes de abrir el panel a uso intensivo

Ejemplo:

```bash
DATABASE_URL=postgresql://tallerdeotto:change-me@127.0.0.1:5432/tallerdeotto
```

Comandos:

```bash
venv/bin/python manage.py migrate
venv/bin/python manage.py check --deploy
venv/bin/python manage.py collectstatic --noinput
```

## 5. Frontend

- Entrar a `tdofrontend/`
- Instalar dependencias
- Generar build

```bash
npm install
npm run build
```

## 6. Servicios

- Instalar `deploy/gunicorn.service.example` como base de systemd
- Instalar `deploy/nginx.tallerdeotto.conf.example` como base de Nginx
- Reiniciar ambos servicios

## 7. Verificacion

- Abrir `/`
- Abrir `/login`
- Probar login/logout
- Abrir `/admin/`
- Verificar `GET /healthz/`
- Verificar carga de imagenes en `/media/`
- Crear un registro de prueba en contacto o trabajos

## 8. Pendientes recomendados

- Mover a PostgreSQL
- Sacar `media/` versionado del repo
- Sacar `cert/` versionado del repo
- Activar HTTPS con certificado real
