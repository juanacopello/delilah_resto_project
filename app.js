const express = require ('express');
const server = express();
const bodyParser = require('body-parser');
server.use(bodyParser.json())
const sequelize = require('./sql')

server.listen(3000, () => console.log("servidor iniciado"))

//Get Users from Users Database

server.get('/users', async (req, res) => {
  const data = await sequelize.query(
    'SELECT * FROM users WHERE role_id = 2',
    {type: sequelize.QueryTypes.SELECT},
  )
  res.send(data)
  console.log(data)
})

//Get Administrators from Users Database


server.get('/users/:role_id', async (req, res) => {
  
  const data = await sequelize.query(
    'SELECT * FROM users WHERE role_id = 1',
    {type: sequelize.QueryTypes.SELECT},
  )
  res.send(data)
})


//PUT actualizar estado de pedido
//POST crear pedido
//VALIDACION para ingresar a la plataforma
