const express = require ('express');
const server = express();
const sequelize = require('./sql');

const AdminMiddleWare = (req, res, next) => {
  const dataAdmin = sequelize.query('SELECT* FROM users WHERE role_id = 1')
  if(dataAdmin){
    res.json({error: "El usuario no está autorizado"})
  }
  next()
  res.status = 401;
  res.send({
    status: 401,
    message: "No estas autorizado",
  })
}

module.exports = AdminMiddleWare;
