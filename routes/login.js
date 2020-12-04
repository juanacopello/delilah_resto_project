const express = require ('express');
const server = express();
const sequelize = require('./../sql');
const jwt = require('jsonwebtoken');
const config = require('./../config')

server.post('/', async (req, res) => {
  const firmaJwt = config.firma
  try{
    const {username, password} = req.body
    const userData = await sequelize.query(`SELECT users.*, roles.role_description 
    FROM users 
    JOIN roles ON users.role_id = roles.role_id
    WHERE username = ? AND password = ?`,
    {replacements: [username, password], type: sequelize.QueryTypes.SELECT})
    if(userData.length){
      const accessToken = jwt.sign({
      username: userData[0].username,
      role: userData[0].role_description
    }, firmaJwt)
      res.send({
        username: userData[0].username,
        accessToken
        })
      console.log(accessToken)
    } else{
      res.StatusCode = 401,
      res.send("Tu usuario o contraseña no coinciden")
    }
}
  catch(err){
    console.log(err)
  }
})

module.exports = server