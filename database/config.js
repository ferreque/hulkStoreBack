const mongoose = require("mongoose");

const { MONGODB_CNN, MONGODB_CNN_TEST, NODE_ENV } = process.env;
const connectionEnv =
  NODE_ENV === "test" ? String(MONGODB_CNN_TEST) : String(MONGODB_CNN);

const dbConnection = async () => {
  try {
    await mongoose.connect(connectionEnv);
    console.log("Base de datos online");
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = { dbConnection };
