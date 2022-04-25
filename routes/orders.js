const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { idOrderExists } = require("../helpers/db-validators");
const { validateJWT } = require("../middlewares/validate-jwt");
const { isAdminRole } = require("../middlewares/validate-rol");
const {
  getOrders,
  getOneOrder,
  createOrder,
  editOrder,
  deleteOrder,
} = require("../controllers/orders");

router.get("/", [validateJWT, isAdminRole, validateFields], getOrders);
router.get("/:id", [validateJWT, isAdminRole, validateFields], getOneOrder);
router.post(
  "/",
  [
    validateJWT,
    check("province", "La provincia es requerida").not().isEmpty(),
    check("location", "La localidad es requerida").not().isEmpty(),
    check("shippingAddress", "La dirección es requerida").not().isEmpty(),
    validateFields,
  ],
  createOrder
);
router.put(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(idOrderExists),
    validateFields,
  ],
  editOrder
);
router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(idOrderExists),
    validateFields,
  ],
  deleteOrder
);

module.exports = router;
