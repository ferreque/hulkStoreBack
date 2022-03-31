const { request, response } = require("express");
const Order = require("../models/order");

const ordersGet = async (req = request, res = response) => {
  const orders = await Order.find({ cancelar: false })
    .populate("cliente", "nombre email")
    .populate("product", "nombre precio");
  res.json({
    msg: "GET pedidos",
    orders,
  });
};
const ordersPost = async (req = request, res = response) => {
  const {
    cancelar,
    provincia,
    localidad,
    codigoPostal,
    direccionEnvio,
    product,
  } = req.body;
  data = {
    cancelar,
    provincia,
    localidad,
    codigoPostal,
    direccionEnvio,
    product,
    cliente: req.usuario._id,
  };

  const order = new Order(data);

  await order.save();

  res.json({
    msg: "Nueva orden generada",
    order,
  });
};
const ordersPut = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, ...rest } = req.body;
  console.log(req.params);

  const order = await Order.findByIdAndUpdate(id, rest, { new: true });
  res.json({
    msg: "Orden editada",
    order,
  });
};
const ordersDelete = async (req = request, res = response) => {
  const id = req.params.id;

  const order = await Order.findByIdAndUpdate(
    id,
    { cancelar: true },
    { new: true }
  );
  res.json({
    msg: "Producto eliminado",
    order,
  });
};

module.exports = {
  ordersGet,
  ordersPost,
  ordersPut,
  ordersDelete,
};
