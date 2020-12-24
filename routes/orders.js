const express = require("express");
const server = express();
const sequelize = require("../sql");

//Middlewares
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleWare = require("../middlewares/adminMiddleware");
const authmiddleware = require("../middlewares/authMiddleware");

/*Traer todos los pedidos realizados. Solo administradores pueden realizar esto.
Check on every order done. Only administrators can do this. */
server.get("/", authMiddleware, adminMiddleWare, async (req, res) => {
  try {
    const dataOrders = await sequelize.query(
      `SELECT order_status.description order_status, orders.date, orders.id order_id, products.name product_name, payment_methods.name payment_method, users.username username, users.address user_address
      FROM orders
      JOIN order_status ON order_status_id = order_status.status_id
      JOIN users ON orders.user_id = users.user_id
      JOIN payment_methods ON payment_method_id = payment_methods.id
      JOIN order_products ON orders.id = order_products.order_id
      JOIN products ON order_products.product_id = products.product_id`,
      { type: sequelize.QueryTypes.SELECT }
    );
    res.send(dataOrders);
  } catch (err) {
    res.status(404).send("No se han encontrado las órdenes");
  }
});

//Encontrar un pedido por ID. Solo administradores pueden realizar esto.

server.get("/:id", authMiddleware, adminMiddleWare, async (req, res) => {
  try {
    const orderData = await sequelize.query(
      `SELECT order_status.description order_status, orders.date, orders.id order_id, products.name product_name, payment_methods.name payment_method, users.username username, users.address user_address
      FROM orders
      JOIN order_status ON order_status_id = order_status.status_id
      JOIN users ON orders.user_id = users.user_id
      JOIN payment_methods ON payment_method_id = payment_methods.id
      JOIN order_products ON orders.id = order_products.order_id
      JOIN products ON order_products.product_id = products.product_id
      WHERE orders.id = ${req.params.id}`,
      { type: sequelize.QueryTypes.SELECT }
    );
    res.send(orderData);
  } catch(err) {
    res.status(404).send("No se ha encontrado la orden");
  }
});

/*Crear un nuevo pedido // Create a new order
Primero se ingresan los datos que debe ingresar el usuario, que se van a almacenar en la tabla Orders,
y luego se agregan los productos en la tabla order_products*/

server.post("/orders", authmiddleware, async (req, res) => {
  try {
    const idUser = Object.values(req.body[0])[0] //Object Values es necesario porque permite identificar la información dentro del array. Si no lo pones, el servidor entiende que estás insertando un NULL
    const paymentMethods = Object.values(req.body[1])[0] //Object Values es necesario porque permite identificar la información dentro del array. Si no lo pones, el servidor entiende que estás insertando un NULL
    const insertOrders = await sequelize.query(
      `INSERT INTO orders (user_id, order_status_id, payment_method_id) VALUES (?, 1, ?)`, //Por defecto el estado de la orden será Nuevo
      { replacements: [idUser, paymentMethods] } //Se pasa el Object Values de arriba. 
    );
    const getOrderId = await sequelize.query(`SELECT MAX(id) FROM orders`, { type: sequelize.QueryTypes.SELECT }); //Identificas el id de la última orden que se generó. Lo utilizas para insertar los productos en order_products
    console.log(getOrderId)
    const last_order = Object.values(getOrderId[0])[0] //Identificas el valor porque si no, se pasa como un NULL
    async function insertProducts (products){
      await sequelize.query(`INSERT INTO order_products (order_id, product_id) VALUES (?, ?)`, { replacements: [last_order, products.product_id] })
    }
    req.body.forEach(insertProducts);
    res.status(200).send("Se registró la orden con éxito")
  } 
  catch (err) {
    res.status(400).send("La orden no logró registrarse. Inténtelo nuevamente.")
  }
});

/*Actualizar el estado de un pedido a través de su ID. Solo administradores
Update an order with the ID. Only admins can do this */

server.put("/:id", authMiddleware, adminMiddleWare, async (req, res) => {
  try {
    const { order_status_id } = req.body;
    await sequelize.query(
      `UPDATE orders SET order_status_id = ? WHERE id = ${req.params.id}`,
      { replacements: [order_status_id] }
    );
    res.send("Se modificó el estado del pedido");
  } catch (err) {
    res.send(err);
  }
});

//Eliminar una orden. Delete an order

server.delete(
  "/:id",
  authMiddleware,
  adminMiddleWare,
  async (req, res) => {
    try {
      const deleteOrder = await sequelize.query(
        `DELETE FROM orders WHERE id = ${req.params.id}`,
        { replacements: { id: parseInt(req.params.id) } }
      );
      res.send("Se ha eliminado la orden");
      console.log(deleteOrder);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
);

module.exports = server;
