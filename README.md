# Motos Candela website - Administrator

This project is developed by students from the Simón Bolívar University:
-   Ana Shek
-   Gabriela Panqueva
-   Kenny Rojas
-   Simon Puyosa

## Used technology

For the development of the FrontEnd, the JavaScript programming language and the React library are used.

For the development of the BackEnd, the JavaScript programming language and the Express framework are used.

For data persistence, a connection to a Mongo NoSQL database is used.

## Start the project

To successfully start the project you need two terminals, one to run the front-end and one to run the back-end.

### Start Front-End

Located at the root of the project we execute the following commands in order:

1. `npm install`
2. `npm start`

This sequence of steps will install all the necessary dependencies and start the frontend of the project on port 3000.

### Start Back-End

In order to start the backend, we must first go to the backend folder

using the `cd./backend` command, then we have to create a ".env" file which must have the following lines:

MONGO_URL = [URL to database]

MONGO_DB = [Database Name]

SECRET = [Password for JWT token]

After creating this file, all you need to do is execute the following commands:

1. `npm install`
2. `npx nodemon app`

This sequence of steps will install all the necessary dependencies, configure the database connection, cookie encoding and will start the backend of the project on port 5000.
