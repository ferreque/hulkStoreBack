require("dotenv").config();
const Server = require("../models/server");
const request = require("supertest");
const Categorie = require("../models/categorie");
const { getToken } = require("./helpers");
const api = request(new Server().app);

beforeEach(async () => {
  await Categorie.deleteMany({ status: false });
});

describe("GET", () => {
  test("categories are returned: status 200, array and json", async () => {
    await api
      .get("/api/categories")
      .expect(200)
      .expect(Array)
      .expect("Content-Type", /application\/json/);
  });
  test("sigle categorie are returned: status 200, array and json", async () => {
    await api
      .get("/api/categories/626a9837318587b9d0fc6b32")
      .expect(200)
      .expect(Array)
      .expect("Content-Type", /application\/json/);
  });
});
describe("POST", () => {
  test("creation a new categorie respond with a status code 200", async () => {
    const token = await getToken();
    const response = await api
      .post("/api/categories")
      .set("x-token", token)
      .send({
        name: "testCategorieCreated",
      })
      .expect(200);
    idCategorieTest = response._body.categorie._id;
  });
});

describe("PUT", () => {
  test("categories are edit and respond with a status code 200", async () => {
    const token = await getToken();
    const response = await api
      .put(`/api/categories/${idCategorieTest}`)
      .set("x-token", token)
      .send({
        name: "testCategorieEdited",
      })
      .expect(200);
    console.log(response._body);
  });
});

describe("DELETE", () => {
  test("categories are delited respond with a status code 200", async () => {
    const token = await getToken();
    const response = await api
      .delete(`/api/categories/${idCategorieTest}`)
      .set("x-token", token)
      .expect(200);
    console.log(response._body);
  });
});
