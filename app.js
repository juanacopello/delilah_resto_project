const express = require ('express');
const server = express();
const bodyParser = require('body-parser');
server.use(bodyParser.json())
const sequelize = require('./sql')

server.listen(3000, () => console.log("servidor iniciado"))



//PUT actualizar estado de pedido
//POST crear pedido
//VALIDACION para ingresar a la plataforma
