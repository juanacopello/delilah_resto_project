const express = require ('express');
const server = express();
const bodyParser = require('body-parser');
const sequelize = require('./sql');
const jwt = require('jsonwebtoken');

server.listen(3000, () => console.log("servidor iniciado"));

//Routes
const productsRoutes = require('./routes/products')
const userRoutes = require('./routes/users')

server.use(bodyParser.json());
server.use('/products', productsRoutes)
server.use('/users', userRoutes)


//config
const firm = '445698';

server.post('/login', async (req, res) => {
  try{
    const {username, password} = req.body
    const userData = await sequelize.query(`SELECT users.*, roles.role_description 
    FROM users 
    JOIN roles ON users.role_id = roles.role_id
    WHERE username = ? AND password = ?`,
    {replacements: [username, password], type: sequelize.QueryTypes.SELECT}
    )
  if(userData.length){
      const accessToken = jwt.sign({
      username: userData[0].username,
      role: userData[0].role_description
      }, firm)
      res.send({
        username: userData[0].username,
        accessToken
      })
      console.log(accessToken)
    } else{
      res.StatusCode = 401,
      res.send({
        message: "Tu usuario o contraseña no coinciden"
      })
    }
}
  catch(err){
    console.log(err)
  }
})

async function authenticateToken(req, res, next){
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  const authHeaders = await req.headers['authorization']
  const headerToken = await authHeaders.split(' ')[1] //Para que se asegure de que hay un Header Authorization
  try{
    const tokenDecoded = jwt.verify(headerToken, firm)
    console.log(tokenDecoded)
    if(tokenDecoded){
      req.username = tokenDecoded
      next()
    }
  }
  catch(err){
    res.json({error: 'Error al validar usuario'})
  }

}

//Update Order Status (Admin Only)
server.put('/orders/:id', async (req, res) => {
  try{
      const {order_status_id} = req.body;
      await sequelize.query(`UPDATE orders SET order_status_id = ? WHERE id = ${req.params.id}`,
          { replacements: order_status_id})
      res.sendStatus(200)
  }
  catch(err){
    res.send(err)
  }
})

