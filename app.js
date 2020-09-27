const express = require ('express');
const server = express();
const bodyParser = require('body-parser');
const sequelize = require('./sql');

server.listen(3000, () => console.log("servidor iniciado"));

//Routes
const productsRoutes = require('./routes/products')
const userRoutes = require('./routes/users')

server.use(bodyParser.json());
server.use('/products', productsRoutes)
server.use('/users', userRoutes)




