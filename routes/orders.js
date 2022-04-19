const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { pedidoIdExiste } = require("../helpers/db-validators");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require("../middlewares/validar-rol");
const {
  ordersGet,
  orderGet,
  ordersPost,
  ordersPut,
  ordersDelete,
} = require("../controllers/orders");

router.get("/", [validarJWT, esAdminRole, validarCampos], ordersGet);
router.get("/:id", [validarJWT, esAdminRole, validarCampos], orderGet);
router.post(
  "/",
  [
    validarJWT,
    check("provincia", "La provincia es requerida").not().isEmpty(),
    check("localidad", "La localidad es requerida").not().isEmpty(),
    check("direccionEnvio", "La dirección es requerida").not().isEmpty(),
    validarCampos,
  ],
  ordersPost
);
router.put(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(pedidoIdExiste),
    validarCampos,
  ],
  ordersPut
);
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(pedidoIdExiste),
    validarCampos,
  ],
  ordersDelete
);

module.exports = router;
