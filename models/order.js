const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    tableName: String,
    username: String,
    date: Date,
    items: [
        {
            product:String,
            quantity:Number,
            comment:String,
            prince: Number
        }
    ],
    totalValue: Number,
    progress: {type: String, enum: ['Pendiente','Cancelada','Terminada']}
});

module.exports = mongoose.model('Order', orderSchema);