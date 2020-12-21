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
const orderRoute = require('./routes/orders')

server.use(bodyParser.json());
server.use('/products', productsRoutes)
server.use('/users', userRoutes)
server.use('/login', loginRoute)
server.use('/orders', orderRoute)

server.post('/orders', async (req, res) => {
  try{
    const {id, user_id, date, order_status_id, payment_method_id} = req.body
    const createOrderData = await sequelize.query(
      'INSERT INTO orders (id, user_id, date, order_status_id, payment_method_id) VALUES (?, ?, ?, ?, ?)',
      {replacements: [id, user_id, date, order_status_id, payment_method_id]}
    );
    console.log(createOrderData)
    res.send("Se han registrado tus datos")
  }
  catch(err){
    res.send(err)
    console.log(err)
  }
})

server.post('/order_products', async (req, res) => {
  try{
    const {id, product_id, order_id} = req.body
    const addProductsData = await sequelize.query(
      'INSERT INTO order_products (id, product_id, order_id) VALUES (?, ?, ?)',
      {replacements: [id, product_id, order_id]}
    )
    console.log(addProductsData)
    res.send("Se ha agregado el producto")
  }
  catch(err){
    res.send(err)
    console.log(err)
  }
})
