const authmiddleware = (req, res, next) => {
  const isLogged = true //Verificar si esta logueado de verdad
  if(isLogged){
    next();
  } else{
      res.status = 401;
      res.send({
      status: 401,
      message: "No estas autorizado"
    })
  }
}

module.exports = authmiddleware;