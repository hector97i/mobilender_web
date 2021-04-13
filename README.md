# mobilender_web

Manejador de ordenes de compra escrita en Django + React. Frontend compilado con Webpack y Babel.

## Instrucciones para ejecucion sin docker-compose en bash (Debian):
1. Crear entorno virtual para python e instalar dependencias.
```bash
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
```
2. Reinstalar node_modules necesarios para el frontend.
```bash
cd src/frontend && npm i
```
3. Hacer build de la version mas reciente del frontend en react.
```bash
cd src/frontend && npm run build
```
4. Migrar la base de datos al esquema acutal.
```bash
python manage.py migrate
```
4. Ejecutar el sevido de Django.
```bash
python manage.py runserver
```
5. Ir a http://localhost:8000

