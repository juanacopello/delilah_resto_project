const express = require ('express');
const server = express();
const sequelize = require('../sql');


//Middlewares 
const authMiddleware = require('../middlewares/authMiddleware')
const adminMiddleWare = require('../middlewares/adminMiddleware')

//Get available products (Users and Admins)
server.get('/', authMiddleware, async (req, res) => {
  try{
    const data = await sequelize.query('SELECT* FROM products WHERE is_available = 1',
    {type: sequelize.QueryTypes.SELECT},
    )
    res.send(data);
  }
  catch(err){
    res.send(err)
  }
});

//Add a New Product (Admins only)
server.post('/', authMiddleware, async (req, res) => {
  try{
    const {product_id, name, price, price_discount, image_url, is_available} = req.body;
    const data = await sequelize.query(
    'INSERT INTO products (product_id, name, price, price_discount, image_url, is_available) VALUES (?, ?, ?, ?, ?, ?)',
    {replacements: [product_id, name, price, price_discount, image_url, is_available]}
  );
  console.log(data)
  }
  catch(err){
    res.send(err)
  }
  
});

//Update Values from a product using product_id (Admins only)
server.put('/:product_id', authMiddleware, async (req, res) => {
  try{
  const {name, price, price_discount, image_url, is_available} = req.body;
  await sequelize.query(
    `UPDATE products SET
          name = ?,
          price = ?,
          price_discount = ?,
          image_url = ?,
          is_available = ?
      WHERE product_id = ${req.params.product_id}`,
    {replacements: [name, price, price_discount, image_url, is_available]});
    res.sendStatus(200);
  }
  catch(err){
    res.send(err)
  }
})

//Delete a product using product_id (Admins only)
server.delete('/:product_id', authMiddleware, async (req, res) => {
  try{
    const data = await sequelize.query(
      `DELETE FROM products WHERE product_id = ${req.params.product_id}`,
      {replacements: {id: req.params.product_id} })
    res.sendStatus(200)  
  }
  catch(err){
    res.send(err)
  }
})

module.exports = server;