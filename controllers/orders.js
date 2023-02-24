const { request, response } = require("express");
const Order = require("../models/order");

const getOrders = async (req = request, res = response) => {
  const orders = await Order.find({ activeOrder: true }).populate(
    "client",
    "name email province location shippingAddress"
  );
  res.json({
    msg: "GET pedidos",
    orders,
  });
};

const getOneOrder = async (req = request, res = response) => {
  const id = req.params.id;
  const order = await Order.findById(id);

  res.json({
    mge: "GET pedido",
    order,
  });
};
const createOrder = async (req = request, res = response) => {
  const { products, province, location, shippingAddress, totalPrice } =
    req.body;

  data = {
    province,
    location,
    shippingAddress,
    products,
    client: req.user._id,
    totalPrice,
  };

  const order = new Order(data);

  await order.save();

  res.json({
    msg: "Nuevo pedido generado",
    order,
  });
};
const editOrder = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, ...rest } = req.body;

  const order = await Order.findByIdAndUpdate(id, rest, { new: true });
  res.json({
    msg: "Pedido editado",
    order,
  });
};
const deleteOrder = async (req = request, res = response) => {
  const id = req.params.id;

  const order = await Order.findByIdAndUpdate(
    id,
    { activeOrder: false },
    { new: true }
  );
  res.json({
    msg: "Pedido eliminado",
    order,
  });
};

module.exports = {
  getOrders,
  getOneOrder,
  createOrder,
  editOrder,
  deleteOrder,
};
