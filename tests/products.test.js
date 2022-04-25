require("dotenv").config();
const Server = require("../models/server");
const request = require("supertest");

const api = request(new Server().app);

let loginToken = "";
let idProductoTest = "";

async function getToken() {
  const response = await api.post("/api/auth/login").send({
    email: "fer@gmail.com",
    password: "123456",
  });
  loginToken = response.body.token;
  return loginToken;
}
getToken();

describe("GET", () => {
  test("products are returned: status 200, array and json", async () => {
    await api
      .get("/api/products")
      .expect(200)
      .expect(Array)
      .expect("Content-Type", /application\/json/);
  });
});
describe("POST", () => {
  test("creation a new product respond with a status code 200", async () => {
    const response = await api
      .post("/api/products")
      .set("x-token", loginToken)
      .send({
        name: "testProducte",
        price: 0,
        stock: 10,
        categorie: "6244bb354151f9c8eed8ed55",
      })
      .expect(200);
    idProductoTest = response._body.product._id;
  });
});

describe("PUT", () => {
  test("products are edit and respond with a status code 200", async () => {
    const response = await api
      .put(`/api/products/${idProductoTest}`)
      .send({ name: "editedProduct" })
      .set("x-token", loginToken)
      .expect(200);
    console.log(response._body);
  });
});

describe("DELETE", () => {
  test("products are delited respond with a status code 200", async () => {
    const response = await api
      .delete(`/api/products/${idProductoTest}`)
      .set("x-token", loginToken)
      .expect(200);
    console.log(response._body);
  });
});
