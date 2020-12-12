# Delilah Restó 
Tercer proyecto realizado para el curso de Desarrollo Web Full Stack para Acámica, una academia en Buenos Aires, Argentina. El objetivo era construir una API Rest para que los usuarios puedan administrar una plataforma de delivery online. 

Con esta plataforma quien posea credenciales de administrador podrá: 
  * Acceder a la información de los usuarios que se registran en la página
  * Agregar un producto nuevo a la base de datos. También podrá modificar los atributos de este producto (como, por ejemplo, el precio o si está disponible) o eliminarlo completamente de la base.
  * Tener un detalle de todos los pedidos realizados la página, modificar algún atributo de estos (por ejemplo, el estado del pedidos) o directamente eliminarlos.

# Tecnologías utilizadas
Para realizar la API se utilizaron las siguientes librerías de Node.js:
  * Express.js: Body Parser y Middlewares para generar el servidor
  * JSON Web Token para generar las credenciales para realizar el inicio de sesión. Asimismo, estas credenciales contienen la información del rol de cada uno de los usuarios, que le permitirá realizar ciertas acciones si es administrador o un usuario que utiliza la página.


# Para poder utilizar esta API se necesitará:
  1. Instalar Node.js
  1. Instalar un programa que permita realizar peticiones HTTP (como Postman)
  1. Instalar un editor de código, como Visual Studio Code (gratuito), Atom o Brackets (pagos)
  1. Instalar un administrador de base de datos que gestione archivos del tipo SQL
  
# Primeros pasos 
  
 1. Clonar el repositorio
 1. Abrir el editor de código e instalar los archivos que se encuentran en el package.json vía npm:
 
    `npm i` o `npm install`
    
    Esto instalará todas las dependencias que se encuentran en el package.json y permitirán utilizar todas las tecnologías descriptas anteriormente
    
 1. Importar la base de datos (el archivo .sql) a nuestro administrador de base de datos
 1. Por último, se debe ejecutar en la terminal el comando npm start. Esto nos permite inicializar el servidor. A partir de ahora podrá realizar todas las peticiones HTTP.
 
 # Peticiones HTTP
 
 Para realizar las peticiones HTTP, se debe indicar la ruta http://localhost:3000/ y luego indicar la ruta correspondiente según el objetivo buscado. 
 
 ### Usuarios
 
  Con esta plataforma quien posea credenciales de usuario podrá:
  * Registrarse con un nuevo usuario e iniciar sesión a la página
  * Crear una orden y agregar los productos que el usuario desee
  
  1. Crear un nuevo usuario
  
  Para crear un nuevo usuario utilizaremos el método POST en la ruta */users*. Allí mandaremos en formato JSON la siguiente información:
    
   ```
  {
  "username": "Nombre De Usuario",
   "fullname": "Nombre Y Apellido",
   "email": "Un Email De Registro",
   "phone_number": "Su numero de telefono",
   "address": "Su dirección",
   "password": "Una contraseña segura"
  }
  ```
  Una vez realizado el registro, recibirá el siguiente mensaje `Se registró al usuario con éxito. Puede iniciar sesión y realizar su orden`
  
  1. Iniciar sesión
  Se utilizará el método POST en la ruta */login*. Allí se mandará en formato JSON la siguiente información: 
  ```
   {
  "username": "Su Nombre De Usuario",
   "password": "Su contraseña"
  }
  ```
 El servidor le responderá con su nombre de usuario y con un código de acceso llamado `accessToken`. Este código es muy importante y necesario ya que no solo nos permite realizar las acciones dentro de nuestra sesión sino que también asegura la seguridad de los datos de la misma.
 
 Una vez iniciada la sesión, ya puede comenzar a observar los productos disponibles y realizar una orden.
 
 1. Conocer los productos disponibles
 
 Para saber cuáles son los productos que se encuentran en stock, se utilizará el método GET a la ruta */products*. 
 
 Esto nos traerá un listado en formato JSON de los productos con su nombre, una imagen, su precio, con el descuento del precio (en caso de no tenerlo, se indicara un 0):
 
 ```
     {
        "product_id": 1,
        "name": "Hamburguesa con lechuga, tomate, jamon y queso",
        "price": 450,
        "price_discount": 0,
        "image_url": "https://pizzeriacherokee.es/wp-content/uploads/2020/05/hamburguesacompleta.jpg",
        "is_available": 1
    }
    
  ```
 A partir de estos productos se podrá realizar la orden:
 
 
 
 ### Administradores
 
