const express = require ('express');
const server = express();
const sequelize = require('../sql');

/*Traer todos los pedidos realizados. Solo administradores pueden realizar esto.
Check on every order done. Only administrators can do this. */
server.get('/orders', async (req, res) => {
  try{
    const dataOrders = 
  }
});

//Traer todos los productos realizados en las ordenes



/*Crear un nuevo pedido
Create a new order */

/*Primero se ingresan los datos que debe ingresar el usuario, que se van a almacenar en la tabla Orders,
y luego se agregan los productos en la tabla order_products*/

server.post('/orders', async (req, res) => {
  try{
    const {id, user_id, date, order_status_id, payment_method_id} = req.body
    const createOrderData = await sequelize.query(
      'INSERT INTO orders (id, user_id, date, order_status_id, payment_method_id) VALUES (?, ?, ?, 1, ?)', //Por defecto el estado de la orden será Nuevo
      {replacements: [id, user_id, date, order_status_id, payment_method_id]}
    );
    console.log(createOrderData)
    res.send("Se han registrado tus datos")
  }
  catch(err){
    res.send(err)
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

//Eliminar un producto en una orden a trves del ID de la orden

server.delete('/order_products/:order_id', async (req, res) => {
  try{
    const deleteData = await sequelize.query(
      `DELETE FROM order_products WHERE order_id = ${req.params.order_id} `
    )
  }
  catch{

  }
})

/*Actualizar el estado de un pedido a través de su ID. Solo administradores
Update an order with the ID. Only admins can do this */

server.put('/orders/:id', async (req, res) => { 
  try{
      const {order_status_id} = req.body;
      await sequelize.query(`UPDATE orders SET order_status_id = ? WHERE id = ${req.params.id}`,
          { replacements: [order_status_id]}
      )
      res.send("Se modificó el estado del pedido")
  }
  catch(err){
    res.send(err)
  }
})


/*Eliminar una orden. Solo administradores.
Delete an order. Only administrators can do this */

