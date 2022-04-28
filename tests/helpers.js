const Server = require("../models/server");
const request = require("supertest");
const api = request(new Server().app);
const getToken = async () => {
  const response = await api.post("/api/auth/login").send({
    email: "fer@gmail.com",
    password: "123456",
  });
  return response.body.token;
};

module.exports = { getToken };
