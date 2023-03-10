const mongoose = require("mongoose");

const { MONGODB_CNN } = process.env;
const connectionEnv = String(MONGODB_CNN);

const dbConnection = async () => {
  try {
    await mongoose.connect(connectionEnv);
    console.log("Base de datos online");
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = { dbConnection };
