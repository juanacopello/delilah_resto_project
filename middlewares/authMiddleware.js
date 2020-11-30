const config = require('../config')
const jwt = require('jsonwebtoken');


const authmiddleware = (req, res, next) => {
    const firmaJwt = config.firma //Traemos la firma del archivo config.js
    //Aca usamos lo que vamos a pasar en los Headers de Json Web Token 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    const headerToken = req.headers.authorization.split(' ')[1] //Para que se asegure de que hay un Header Authorization
      const tokenDecoded = jwt.verify(headerToken, firmaJwt) //Verifica que el JWT sea el correcto para darle el acceso al usuario 
      console.log(tokenDecoded) 
      if(tokenDecoded){
        return next()
      }
      else{
        res.status = 401;
        res.send({
        status: 401,
        message: "No estas autorizado"
        })
      }
}

module.exports = authmiddleware;