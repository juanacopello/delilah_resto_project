const express = require ('express');
const server = express();
const sequelize = require('../sql')

//Create new user
server.post('/', async (req, res) =>{
  try{
      const {username, fullname, email, phone_number, address, password} = req.body
      const data = await sequelize.query(
      'INSERT INTO users (username, fullname, email, phone_number, address, password, role_id) VALUES (?, ?, ?, ?, ?, ?, 2)',
      {
        replacements:[username, fullname, email, phone_number, address, password]
      })
  console.log(data)
  res.sendStatus(200)
  }
  catch(err){
    res.send(err)
  }
})

module.exports = server;