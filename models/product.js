const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del producto es obligatorio"],
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
  precio: {
    type: Number,
    required: true,
  },
  categorie: {
    type: Schema.Types.ObjectId,
    ref: "Categories",
    required: true,
  },
  descripcion: {
    type: String,
  },
  disponible: {
    type: Boolean,
    default: true,
  },
});
ProductSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
};
module.exports = model("Product", ProductSchema);
