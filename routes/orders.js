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

/*Crear un nuevo pedido
Create a new order */


//Que el post permita agregar dstintos tipos de productos
//mandar por defecto el estado del pedido y despues eso se modifica

server.post('')

/*Actualizar el estado de un pedido. Solo administradores
Update an order. Only admins can do this */

server.put('/orders/:id', async (req, res) => { //Actualizar via ID del pedido
  try{
      const {order_status_id} = req.body;
      await sequelize.query(`UPDATE orders SET order_status_id = ? WHERE id = ${req.params.id}`,
          { replacements: order_status_id})
      res.sendStatus(200)
  }
  catch(err){
    res.send(err)
  }
})

/*Borrar un pedido. Solo administradores.
Delete an order. Only administrators can do this */