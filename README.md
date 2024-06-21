# Pagina web Motos Candela - Administrador

Este proyecto esta siendo desarrollado por los estudiantes de la Universidad Simon Bolivar:

-   Ana Shek
-   Gabriela Panqueva
-   Kenny Rojas
-   Simon Puyosa

## Tecnologias utilizadas

Para el desarrollo del FrontEnd se utiliza el lenguaje de programacion JavaScript y la libreria React.

Para el desarrollo del BackEnd se utiliza el lenguaje de programacion JavaScript y el framework Express.

Para la persistencias de datos se utiliza una conexion a una base de datos NoSQL de Mongo.

## Iniciar el proyecto

Para iniciar el proyecto de manera satisfactoria se necesitan dos terminales, una para ejecutar el frontEnd y otra para ejecutar el backEnd.

### Iniciar el FrontEnd

Ubicados en la raiz del proyecto ejecutamos los siguientes comandos en orden:

1. `npm install`
2. `npm start`

Esta secuencia de pasos instalara todas las dependencias necesarias e iniciara el frontEnd del proyecto en el puerto 3000.

### Iniciar el BackEnd

Para poder iniciar el backend, primero debemos ubicarnos en la carpeta backend
usando el comando `cd./backend`, luego tenemos que crear un archivo ".env" el cual debe tener las siguientes lineas:

MONGO_URL = [URI a la base de datos]

MONGO_DB = [Nombre de la base de datos]

SECRET = [Contraseña para el token JWT]

Habiendo creado este archivo solo resta ejecutar los siguientes comandos:

1. `npm install`
2. `npx nodemon app`

Esta secuencia de pasos instalara todas las dependencias necesarias, configurara la conexion a la base de datos, la codificacion de las cookies e iniciara el backEnd del proyecto en el puerto 5000.
