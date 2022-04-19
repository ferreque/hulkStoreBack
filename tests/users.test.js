const supertest = require("supertest");
const router = require("../routes/products");

const api = supertest(router);

test("products are returned as json", async () => {
  await api
    .get("/api/products")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});
