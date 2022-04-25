const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  amount: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    required: [true, "El nombre del producto es obligatorio"],
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imagen: {
    type: String,
    default: "https://llevatilde.es/imagetexts/0/04/vac%C3%ADa.png",
  },
  categorie: {
    type: Schema.Types.ObjectId,
    ref: "Categorie",
    required: true,
  },
  description: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});
ProductSchema.methods.toJSON = function () {
  const { __v, status, ...data } = this.toObject();
  return data;
};
module.exports = model("Product", ProductSchema);
