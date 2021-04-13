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
npm run build
```
4. Migrar la base de datos al esquema acutal.
```bash
cd ..
python manage.py migrate
```
4. Ejecutar el sevido de Django.
```bash
python manage.py runserver
```
5. Ir a http://localhost:8000

## Funcionalidad
El frontend muestra correctamente las ordenes que creadas en la base de datos. La creacion de ordenes desde el frontend queda pendiente.

Al estar diseñada sobre Django Rest Framework, la API hereda de una clase llamada ModelViewset, la cual incluye funciones para cada metodo HTTP. De esta manera, la URL bajo la cual esta la API dinamicamente realiza las acciones que le indica el metodo HTTP y el payload. De esta manera implementamos un CRUD completo con pocas lineas de codigo.

Para crear una orden se deben crear primero clientes, proveedores y articulos. Estos se pueden crear enviando un POST request de tipo JSON con el objeto a crear a las urls /api/clientes/, /api/proveedores/ o /api/articulos/.

Posteriormente se puede crear una orden en /api/ordenes/. Para asociar el modelo de Articulo con el modelo de Orden mediante una relacion muchos a muchos, Django nos permite usar un modelo intermedio que almacena ademas informacion adicional necesaria sin tener que editar los esquemas bases que relaciona. De esa manera tenemos una instancia unica para los modelos relacionados.

Al haber creado una orden, se pueden añadir articulos creando un objeto del tipo ArticleQuantity, el cual es un modelo que contiene campos de llave foranea para la orden, el articulo y el proveedor seleccionados, asi como la cantidad deseada de dicho articulo.

Todo esto es comunicado via JSON utilizando serializadores que nos otorga DRF con la herencia de la clase ModelSerializer. Estos serializadores nos ayudan a empaquetar la informacion dependiendo de la aplicacion que necesite el cliente o el formato de los datos.


