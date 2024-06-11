const express = require('express');
const router = express.Router();
const Order = require('../models/order.js');

const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(id, { progress: status }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json({ message: 'Error updating order status', error: err.message });
    }
};

module.exports = {
    updateOrderStatus
};

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

//Ruta para actualizar el estado de la orden 
router.put('/order/:id/status', async (req, res) => {
    const {id} = req.params;
    const {status} = req.body;

    try {
        const updateOrder = await Order.findByIdAndUpdate(id,{progress: status}, {new: true});
        if(!updateOrder){
            return res.status(404).json({message: 'Order not found'});
        }
        res.status(200).json(updatedOrder);
    } catch(err){
        res.status(500).json({ message: 'Error updating order status', error: err.message})
    }
})


module.exports = router;