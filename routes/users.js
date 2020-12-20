const express = require ('express');
const server = express();
const sequelize = require('../sql')

//Middlewares 
const adminMiddleWare = require('../middlewares/adminMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

/*Crear un nuevo usuario
Create a new user*/
server.post('/', async (req, res) =>{
  try{
      const {username, fullname, email, phone_number, address, password} = req.body
      const data = await sequelize.query(
      'INSERT INTO users (username, fullname, email, phone_number, address, password, role_id) VALUES (?, ?, ?, ?, ?, ?, 2)',
      {
        replacements:[username, fullname, email, phone_number, address, password]
      })
  console.log(data)
  res.send("Se registró al usuario con éxito. Puede iniciar sesión y realizar su orden")
  }
  catch(err){
    res.send(err)
  }
})

/*Acceder a la información de los usuarios. Solo administradores
Access users's information. Only administrators can do this*/

server.get('/', authMiddleware, adminMiddleWare, async (req, res) => {
  try{
    const userData = await sequelize.query('SELECT* FROM users WHERE role_id = 2',
    {type:sequelize.QueryTypes.SELECT})
    res.send(userData)
  }
  catch(err){
    res.send(err)
  }
});

module.exports = server;