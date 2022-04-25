// require("dotenv").config();
// const Server = require("../models/server");
// const request = require("supertest");

// const api = request(new Server().app);

// let loginToken = "";
// // let idUserTest = "";

// async function getToken() {
//   const response = await api.post("/api/auth/login").send({
//     email: "fer@gmail.com",
//     password: "123456",
//   });
//   loginToken = response;
//   return loginToken;
// }
// getToken();

// describe("GET", () => {
//   test("users are returned: status 200, array and json", async () => {
//     await api
//       .get("/api/users")
//       .set("x-token", loginToken)
//       .expect(200)
//       .expect(Array)
//       .expect("Content-Type", /application\/json/);
//   });
// });
// describe("POST", () => {
//   test("creation a new user respond with a status code 200", async () => {
//     const response = await api
//       .post("/api/users")
//       .send({
//         nombre: "testName",
//         email: "test@test.com",
//         password: 123456,
//         provincia: "testLocation",
//         localidad: "testLandia",
//         direccionEnvio: "calle siempreviva 123",
//         rol: "USER_ROLE",
//       })
//       .expect(200);
//     idUserTest = response._body;
//     console.log(idUserTest);
//   });
// });

// describe("PUT", () => {
//   test("users are edit and respond with a status code 200", async () => {
//     const response = await api
//       .put(`/api/users/${idProductoTest}`)
//       .send({ nombre: "editedProduct" })
//       .set("x-token", loginToken)
//       .expect(200);
//     console.log(response._body);
//   });
// });

// describe("DELETE", () => {
//   test("users are delited respond with a status code 200", async () => {
//     const response = await api
//       .delete(`/api/users/${idProductoTest}`)
//       .set("x-token", loginToken)
//       .expect(200);
//     console.log(response._body);
//   });
// });
