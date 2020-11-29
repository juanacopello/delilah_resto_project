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

server.post('')

/*Actualizar un pedido. Solo administradores
Update an order. Only admins can do this */

/*Borrar un pedido. Solo administradores.
Delete an order. Only administrators can do this */