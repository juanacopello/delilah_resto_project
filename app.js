const express = require ('express');
const server = express();
const bodyParser = require('body-parser');
const sequelize = require('./sql');
const jwt = require('jsonwebtoken');
const config = require('./config')

server.listen(3000, () => console.log("servidor iniciado"));

//Routes
const productsRoutes = require('./routes/products')
const userRoutes = require('./routes/users')

server.use(bodyParser.json());
server.use('/products', productsRoutes)
server.use('/users', userRoutes)


server.post('/login', async (req, res) => {
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



