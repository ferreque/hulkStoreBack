const { Schema, model } = require("mongoose");

const CategorieSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre de la categoría es obligatorio"],
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
CategorieSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
};
module.exports = model("Categorie", CategorieSchema);
