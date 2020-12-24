const express = require ('express');
const server = express();
const bodyParser = require('body-parser');
const sequelize = require('./sql');
const jwt = require('jsonwebtoken');
const config = require('./config')

server.listen(3000, () => console.log("servidor iniciado"));

//Routes
const productsRoutes = require('./routes/products') //Productos
const userRoutes = require('./routes/users') //Usuarios
const loginRoute = require('./routes/login') //For login
const orderRoute = require('./routes/orders') //Ordenes

server.use(bodyParser.json());
server.use('/products', productsRoutes)
server.use('/users', userRoutes)
server.use('/login', loginRoute)
server.use('/orders', orderRoute)

