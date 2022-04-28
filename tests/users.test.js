require("dotenv").config();
const Server = require("../models/server");
const request = require("supertest");
const User = require("../models/user");
const { getToken } = require("./helpers");
const api = request(new Server().app);

beforeEach(async () => {
  await User.deleteMany({ status: false });
});

describe("GET", () => {
  test("users are returned: status 200, array and json", async () => {
    const token = await getToken();
    await api
      .get("/api/users")
      .set("x-token", token)
      .expect(200)
      .expect(Array)
      .expect("Content-Type", /application\/json/);
  });
  test("sigle user are returned: status 200, array and json", async () => {
    const token = await getToken();
    await api
      .get("/api/users/6266b144e1c400bf5aefbb16")
      .set("x-token", token)
      .expect(200)
      .expect(Array)
      .expect("Content-Type", /application\/json/);
  });
});
describe("POST", () => {
  test("creation a new user respond with a status code 200", async () => {
    const response = await api
      .post("/api/users")
      .send({
        name: "testName",
        email: "test@test.com",
        password: 123456,
        rol: "USER_ROLE",
        province: "testLocation",
        location: "testLandia",
        shippingAddress: "calle siempreviva 123",
      })
      .expect(200);
    idUserTest = response._body.user._id;
  });
});

describe("PUT", () => {
  test("users are edit and respond with a status code 200", async () => {
    const token = await getToken();
    const response = await api
      .put(`/api/users/${idUserTest}`)
      .send({ name: "editeduser" })
      .set("x-token", token)
      .expect(200);
    console.log(response._body);
  });
});

describe("DELETE", () => {
  test("users are delited respond with a status code 200", async () => {
    const token = await getToken();
    const response = await api
      .delete(`/api/users/${idUserTest}`)
      .set("x-token", token)
      .expect(200);
    console.log(response._body);
  });
});
