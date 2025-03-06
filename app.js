const express = require('express');
const { engine } = require('express-handlebars');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI).
then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
});

// Configuración de Handlebars
app.engine('handlebars', engine()); 
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Views de Rutas
app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

// Usar el middleware de manejo de errores
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
