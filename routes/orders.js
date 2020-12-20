const express = require("express");
const server = express();
const sequelize = require("../sql");

//Middlewares
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleWare = require("../middlewares/adminMiddleware");

/*Traer todos los pedidos realizados. Solo administradores pueden realizar esto.
Check on every order done. Only administrators can do this. */
server.get("/orders", authMiddleware, adminMiddleWare, async (req, res) => {
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

//Encontrar un pedido por ID

server.get("orders/:id", async (req, res) => {
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
  } catch (err) {
    res.status(404).send("No se ha encontrado la orden");
  }
});

/*Crear un nuevo pedido
Create a new order */

/*Primero se ingresan los datos que debe ingresar el usuario, que se van a almacenar en la tabla Orders,
y luego se agregan los productos en la tabla order_products*/

server.post("/orders", authMiddleware, async (req, res) => {
  try {
    const { id, user_id, date, order_status_id, payment_method_id } = req.body;
    const createOrderData = await sequelize.query(
      "INSERT INTO orders (id, user_id, date, order_status_id, payment_method_id) VALUES (?, ?, ?, ?, ?)",
      { replacements: [id, user_id, date, 1, payment_method_id] } //Por defecto el estado de la orden será Nuevo
    );
    console.log(createOrderData);
    const getOrderId = await sequelize.query(
      "SELECT MAX(order_id) FROM orders",
      { type: sql.QueryTypes.SELECT }
    );
    const insertProducts = await sequelize.query(
      "INSERT INTO order_products (product_id, order_id) VALUES (?, ?)",
      { replacements: [product_id, getOrderId] }
    );
    console.log(insertProducts);
    res.send("Su orden se  ");
  } catch (err) {
    res.send(err);
  }
});

server.post("/order_products", authMiddleware, async (req, res) => {
  try {
    const { id, product_id, order_id } = req.body;
    const addProductsData = await sequelize.query(
      "INSERT INTO order_products (id, product_id, order_id) VALUES (?, ?, ?)",
      { replacements: [id, product_id, order_id] }
    );
    console.log(addProductsData);
    res.send("Se ha agregado el producto");
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

//Eliminar un producto en una orden a trves del ID en order_products

server.delete("/order_products/:id", authMiddleware, async (req, res) => {
  try {
    const deleteData = await sequelize.query(
      `DELETE FROM order_products WHERE id = ${req.params.id}`,
      { replacements: { id: parseInt(req.params.id) } }
    );
    res.send("Se ha eliminado el producto de su orden");
    console.log(deleteData);
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

/*Actualizar el estado de un pedido a través de su ID. Solo administradores
Update an order with the ID. Only admins can do this */

server.put("/orders/:id", authMiddleware, adminMiddleWare, async (req, res) => {
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

/*Eliminar una orden. Solo administradores.
Delete an order. Only administrators can do this */

server.delete(
  "/orders/:id",
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
