const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const router = express.Router();

// Crear un nuevo carrito
router.post('/', async (req, res) => {
    const newCart = new Cart({
        products: []
    });

    try {
        const savedCart = await newCart.save();
        res.status(201).json(savedCart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Obtener productos de un carrito
router.get('/:cid', async (req, res, next) => {
    try {
        const cart = await Cart.findById(req.params.cid).populate('products.product');
        if (!cart) return next({ status: 404, message: 'Carrito no encontrado' });
        res.json(cart);
    } catch (error) {
        next({ status: 500, message: error.message });
    }
});

// Agregar un producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const cart = await Cart.findById(cid);
        const product = await Product.findById(pid);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

        const existingProduct = cart.products.find(p => p.product.toString() === pid);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar un producto del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const cart = await Cart.findById(cid);
        cart.products = cart.products.filter(product => product.product.toString() !== pid);
        await cart.save();
        res.json({ message: 'Producto eliminado del carrito' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;