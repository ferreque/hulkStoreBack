const { Schema, model } = require("mongoose");

const OrderSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDIENTE", "ENVIADO", "ENTREGADO"],
    default: "PENDIENTE",
    required: true,
  },
  activeOrder: {
    type: Boolean,
    default: true,
  },
  totalPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  province: {
    type: String,
    required: [true, "La provincia es obligatoria"],
  },
  location: {
    type: String,
    required: [true, "La localidad es obligatoria"],
  },
  shippingAddress: {
    type: String,
    required: [true, "La direccion es obligatoria"],
  },
});
OrderSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};
module.exports = model("Order", OrderSchema);
