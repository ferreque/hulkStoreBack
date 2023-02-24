const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.usersPhat = "/api/users";
    this.authPath = "/api/auth";
    this.categoriesPath = "/api/categories";
    this.productsPath = "/api/products";
    this.ordersPath = "/api/orders";
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
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.usersPhat, require("../routes/users"));
    this.app.use(this.categoriesPath, require("../routes/categories"));
    this.app.use(this.productsPath, require("../routes/products"));
    this.app.use(this.ordersPath, require("../routes/orders"));
  }
  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log("Servidor online en puerto", process.env.PORT);
    });
  }
}

module.exports = Server;
