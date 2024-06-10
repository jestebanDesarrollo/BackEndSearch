const express = require('express');
const cors = require('cors');   
const mongoose = require('mongoose');
require('dotenv').config();
const ordersRoutes = require('./routes/orders');

const app = express()
const port = process.env.PORT || 3200

app.use(express.json())
app.use(express.urlencoded({extended: true }))

app.use(express.json())
app.use(cors());
app.use('/api', ordersRoutes)

app.get('/', (req, res) => {
    res.send("Hola, desde API REST")
})

mongoose.connect(process.env.MONGODB_URI)
   .then(() => console.log('Conectado a la base de datos de MongoDB Atlas'))
   .catch((err) => console.error("Error de conexión a la base de datos:", err));

app.listen(port, () => {
    console.log(`Servidor iniciando en http://localhost:${port}`)
})