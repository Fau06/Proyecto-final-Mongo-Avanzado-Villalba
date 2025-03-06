const express = require('express'); 
const Product = require('../models/Product');
const router = express.Router();


router.get('/categories', async (req, res, next) => {
    try {
        const categories = await Product.distinct('category');
        res.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: 'Error loading categories' });
    }
});

router.get('/', async (req, res, next) => {
    const { limit = 10, page = 1, sort, query, minPrice, maxPrice, inStock } = req.query;
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {},
    };

    const filter = {};
    
    if (query) {
        filter.category = query; 
    }
    
    if (inStock) {
        filter.stock = { $gt: 0 };
    }
    
    if (minPrice) {
        filter.price = { ...filter.price, $gte: parseFloat(minPrice) };
    }
    if (maxPrice) {
        filter.price = { ...filter.price, $lte: parseFloat(maxPrice) };
    }

    try {
        const products = await Product.find(filter).sort(options.sort).limit(options.limit);
        const totalProducts = await Product.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / limit);
        
        res.json({
            status: 'success',
            payload: products,
            totalPages,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < totalPages ? page + 1 : null,
            page: parseInt(page),
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevLink: page > 1 ? `/api/products?page=${page - 1}&limit=${limit}` : null,
            nextLink: page < totalPages ? `/api/products?page=${page + 1}&limit=${limit}` : null,
        });
    } catch (error) {
        next({ status: 500, message: error.message });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const product = await Product.findById(req.params.pid);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res, next) => {
    const { title, description, code, price, stock, category } = req.body;

    try {
        const existingProduct = await Product.findOne({ code });
        if (existingProduct) {
            return next({ status: 400, message: 'El producto ya existe' });
        }

        const newProduct = new Product({
            title,
            description,
            code,
            price,
            stock,
            category,
            status: true,
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        next({ status: 500, message: error.message });
    }
});

router.put('/:pid', async (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.pid, {
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnails,
        }, { new: true });

        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.pid);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
