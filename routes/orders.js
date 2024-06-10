const express = require('express');
const router = express.Router();
const Order = require('../models/order.js');

//Ruta para obtener todas las órdenes
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
});

//Ruta para buscar ordenes por número de mesa o estado 
router.get('/orders/search', async (req,res) => {
    const { tableNumber, status } = req.query;
    let query = {};

    if(tableNumber) {
        query.tableName = tableNumber;
    }
    if (status){
        query.progress = status;
    }

    try {
        const orders = await Order.find(query);
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
});

module.exports = router;