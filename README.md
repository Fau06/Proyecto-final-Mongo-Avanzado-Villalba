# Mi Proyecto

Este es un proyecto de gestión de productos y carritos utilizando Node.js, Express, MongoDB y Handlebars. Permite agregar, editar, eliminar y filtrar productos, así como gestionar carritos de compra.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework para construir aplicaciones web en Node.js.
- **MongoDB**: Base de datos NoSQL para almacenar productos y carritos.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB y Node.js.
- **Handlebars**: Motor de plantillas para generar HTML dinámico.
- **dotenv**: Para manejar variables de entorno.

## Estructura del Proyecto

mi-proyecto/
├── models/
│ ├── Cart.js
│ └── Product.js
├── routes/
│ ├── carts.js
│ └── products.js
├── views/
│ ├── layouts/
│ │ └── main.handlebars
│ ├── home.handlebars
│ └── realTimeProducts.handlebars
├── .env
├── app.js
├── package.json
└── README.md


## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/USERNAME/REPOSITORY.git
   ```

2. Navega a la carpeta del proyecto:

   ```bash
   cd mi-proyecto
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Configura tu archivo `.env` con la URI de tu base de datos MongoDB:

   ```
   MONGODB_URI=mongodb://localhost:27017/miproyecto
   ```

## Uso

1. Inicia el servidor:

   ```bash
   npm start
   ```

   O para desarrollo con `nodemon`:

   ```bash
   npm run dev
   ```

2. Abre tu navegador y visita `http://localhost:8080` para acceder a la aplicación.

## Endpoints

### Productos

- **GET /api/products**: Obtener todos los productos con opciones de filtrado y paginación.
- **GET /api/products/categories**: Obtener categorías únicas de productos.
- **GET /api/products/:pid**: Obtener un producto específico por ID.
- **POST /api/products**: Agregar un nuevo producto.
- **PUT /api/products/:pid**: Actualizar un producto existente.
- **DELETE /api/products/:pid**: Eliminar un producto.

### Carritos

- **POST /api/carts**: Crear un nuevo carrito.
- **GET /api/carts/:cid**: Obtener productos de un carrito específico.
- **POST /api/carts/:cid/product/:pid**: Agregar un producto a un carrito.
- **DELETE /api/carts/:cid/products/:pid**: Eliminar un producto de un carrito.
