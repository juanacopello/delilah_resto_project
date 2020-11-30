const express = require ('express');
const server = express();
const sequelize = require('../sql');

const AdminMiddleWare = (req, res, next) => {
  const dataAdmin = res.locals.isAdmin
  if(dataAdmin === "Administrador"){
    next()
  }
  else{
    res.status = 401;
    res.send({
      status: 401,
      message: "Solo el administrador puede realizar estas operaciones",
    })
  }
}

module.exports = AdminMiddleWare;
