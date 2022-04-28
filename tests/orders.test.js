require("dotenv").config();
const Server = require("../models/server");
const request = require("supertest");
const Order = require("../models/order");
const { getToken } = require("./helpers");
const api = request(new Server().app);

beforeEach(async () => {
  await Order.deleteMany({ activeOrder: false });
});

describe("GET", () => {
  test("orders are returned: status 200, array and json", async () => {
    const token = await getToken();
    await api
      .get("/api/orders")
      .set("x-token", token)
      .expect(200)
      .expect(Array)
      .expect("Content-Type", /application\/json/);
  });
  test("sigle order are returned: status 200, array and json", async () => {
    const token = await getToken();
    await api
      .get("/api/orders/626acd2a5b8a2d03d5505cbf")
      .set("x-token", token)
      .expect(200)
      .expect(Array)
      .expect("Content-Type", /application\/json/);
  });
});
describe("POST", () => {
  test("creation a new order respond with a status code 200", async () => {
    const token = await getToken();
    const response = await api
      .post("/api/orders")
      .set("x-token", token)
      .send({
        province: "Tucuman",
        location: "San Miguel de Tucuman",
        shippingAddress: "Lavalle 951",
        product: "626a9837318587b9d0fc6b32",
      })
      .expect(200);
    idOrderTest = response._body.order._id;
  });
});

describe("PUT", () => {
  test("orders are edit and respond with a status code 200", async () => {
    const token = await getToken();
    const response = await api
      .put(`/api/orders/${idOrderTest}`)
      .set("x-token", token)
      .send({
        province: "TucumanEdited",
        location: "San Miguel de Tucuman",
        shippingAddress: "Lavalle 951",
        product: "626a9837318587b9d0fc6b32",
      })
      .expect(200);
    console.log(response._body);
  });
});

describe("DELETE", () => {
  test("orders are delited respond with a status code 200", async () => {
    const token = await getToken();
    const response = await api
      .delete(`/api/orders/${idOrderTest}`)
      .set("x-token", token)
      .expect(200);
    console.log(response._body);
  });
});
