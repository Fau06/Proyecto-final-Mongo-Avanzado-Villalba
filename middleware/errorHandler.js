// mi-proyecto/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err); // Log del error en la consola

    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
    });
};

module.exports = errorHandler;

