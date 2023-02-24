require("dotenv").config();
const Server = require("../models/server");
const request = require("supertest");
const Product = require("../models/product");
const { getToken } = require("./helpers");
const api = request(new Server().app);

beforeEach(async () => {
  await Product.deleteMany({ status: false });
});

describe("GET", () => {
  test("products are returned: status 200, array and json", async () => {
    await api
      .get("/api/products")
      .expect(200)
      .expect(Array)
      .expect("Content-Type", /application\/json/);
  });
  test("sigle product are returned: status 200, array and json", async () => {
    await api
      .get("/api/products/626a9837318587b9d0fc6b32")
      .expect(200)
      .expect(Array)
      .expect("Content-Type", /application\/json/);
  });
});
describe("POST", () => {
  test("creation a new product respond with a status code 200", async () => {
    const token = await getToken();
    const response = await api
      .post("/api/products")
      .set("x-token", token)
      .send({
        name: "testProduct",
        price: 0,
        stock: 10,
        categorie: "626aca5ebce202f318eb8a8f",
      })
      .expect(200);
    idProductTest = response._body.product._id;
  });
});

describe("PUT", () => {
  test("products are edit and respond with a status code 200", async () => {
    const token = await getToken();
    const response = await api
      .put(`/api/products/${idProductTest}`)
      .send({ name: "editedProduct" })
      .set("x-token", token)
      .expect(200);
    console.log(response._body);
  });
});

describe("DELETE", () => {
  test("products are delited respond with a status code 200", async () => {
    const token = await getToken();
    const response = await api
      .delete(`/api/products/${idProductTest}`)
      .set("x-token", token)
      .expect(200);
    console.log(response._body);
  });
});
