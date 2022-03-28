const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.usersPhat = "/api/users";
    this.middlewares();
    this.routes();
    this.conectarDB();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(express.static("public"));
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.usersPhat, require("../routes/users"));
  }
  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log("Servidor online en puerto", process.env.PORT);
    });
  }
}

module.exports = Server;
