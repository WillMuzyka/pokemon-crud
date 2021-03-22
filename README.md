<h1  align="center">
<img  alt="Project Pokemon"  src="https://images.unsplash.com/photo-1609845768806-767fcfc317b6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80"  style="width:800px; height:300px; object-fit:cover"/>
</h1>
<h3  align="center">
Project Pokemon
</h3>

<p  align="center">
<a  href="https://github.com/WillMuzyka">
<img  alt="Made with Love"  src="https://img.shields.io/badge/made%20with-love-%2304D361">
</a>
<a  href="LICENSE">
<img  alt="License"  src="https://img.shields.io/badge/license-MIT-%2304D361">
</a>
</p>

<p  align="center">
<a  href="#joystick-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a  href="#hourglass_flowing_sand-installation">Installation</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a  href="#book-environment-variables">Environment Variables</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a  href="#whale2-docker">Docker</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#motorway-routes">Routes</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a  href="#cop-remarks">Remarks</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a  href="#memo-license">License</a>
</p>

This is an application to add Pokemons and manage them (API CRUD), saving on MongoDB
Also have a user system, with JWT authentication

## :joystick: Technologies

This project used a lot of technologies and concepts. A few of them are listed below.
(Also some languages, libraries and frameworks):

* [TypeScript](https://www.typescriptlang.org/)
* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Docker](https://www.docker.com/)

## :hourglass_flowing_sand: Installation:

To install and use this application, first be sure that you have node version 12, npm and/or yarn installed (you can run everything with npm, if you prefer, but I recommend yarn). They are essential for running the application.

The whole project was made based on Node.js and docker. If you want to use this library, please clone this repository and check the following steps.

**Steps**

1. Open your computer's terminal and change for the directory that you want to keep this application. Run the code `git clone https://github.com/WillMuzyka/pokemon-crud.git`.

2. Run the command `yarn` or `npm install` to install all the required packages listed on the file *`package.json`*.

3. Set the environment variables that suits your setup. An example can be found at the root directory of this project and more information can be found on section "Variables".

4. The backend consumes a MongoDB Database, so you will need have them running. I used docker, but feel free to use any other service.

5. After installing the packages, run the command `yarn dev:server` to start the backend. This will keep running until you end the application (Ctrl + C) or close the window that is running. It will not run in the background, so you need to keep the window open. This application uses the port `:3333`, so be careful to not have another application trying to run on the same port.

6. Enjoy the application!


## :book: Environment Variables

This project has a .env file that contains all the environment variables. They are required and should not be left with empty values. The list of all variables can be found bellow.

* **APP_SECRET**: The secret for the application JWT (Json Web Token) generation.
* **MONGO_DB_ACTIVE**: Variable to enable or not MongoDB. Currently PostgreSQL is not configured, so keep this always true
* **MONGO_ADDR**: The hostname for mongo database. If using docker, this variable will be automatically set for the mongo container name.
* **MONGO_PORT**: The port for mongo database.
* **MONGO_DB_NAME**: The name for mongo database.
* **MONGO_DB_NAME**: The name for mongo database.
* **MONGO_INITDB_ROOT_USERNAME**: The initial value of root username for mongo database.
* **MONGO_INITDB_ROOT_PASSWORD**: The initial value of root password for mongo database.

## :whale2: Docker

This project can be setup all within a container using docker. For this, first be sure to have installed both docker and docker-compose on your machine.
To start the application, run `docker-compose up -d`. It will build (if needed) the containers and start the application in detached mode.
To stop, run `docker-compose stop`.

Just a small remark on docker configuration: on some local tests, the first run sometimes did not configure the database correctly. Even though the backend awaits the database container to be running before starting, sometimes the database did not completely initialize before the backend container tries to connect and send queries. If this happens, run the command to stop and start the containers again.

## :motorway: Routes

This project has the following routes, with the designed behavior.
It also have a Swagger file and route (/api-docs), that contain the details for each route with example of responses.
If you want to test the API with Insomnia, a `Insomnia.json` file is present at the root directory of this project, just import it on Insomnia. Some routes require the user to be authenticated, so first run the Create User and then Authenticate User, the response variables will be used the other routes that require the authentication. This is also true to Create User and Create Pokemon routes: their responses are used on other Insomnia route variables, so keep that in mind. 

**Unauthorized routes**
* GET /api-docs
  * API documentation using Swagger. Please access it or use any other Swagger editor to check the routes' details;
* POST /users
	* Create an user using an email, nickname and password
* POST /sessions
  * Create a session for a specific user. Requires an email and password from an existing user

**Only authorized users routes**
* PUT /users
  * Update an user email, nickname and/or password
* GET /pokemons
  * List all pokemons registered on the database
* POST /pokemons
  * Create a pokemon using a name and type
* GET /pokemons/:id
  * Get a pokemon details
* PUT /pokemons/:id
  * Update a pokemon name and/or type
* DELETE /pokemons/:id
  * Delete a pokemon

## :cop: Remarks

Please notice that this project was made to evaluate my knowledge on the concepts of the node.js, typescript, mongodb and docker.

This is not a deploy version of the application and may not be optimized. The whole purpose of this code is for my own evaluation and I do not have any guaranty if you want to deploy or use it commercially.

Observation: One point that can be improved in this code is the fact that it does not check for extra field on Pipedrive. A variable could be added to .env file to enable or not the verification requirement of these fields.

## :memo: LICENSE

This project is under the MIT License. For more information, please refer to [LICENSE](LICENSE).
