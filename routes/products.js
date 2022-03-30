const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  productoIdExiste,
  nombreProductoExiste,
  categoriaIdExiste,
} = require("../helpers/db-validators");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require("../middlewares/validar-rol");
const {
  productsGet,
  productsPost,
  productsPut,
  productsDelete,
} = require("../controllers/products");

router.get("/", [], productsGet);
router.post(
  "/",
  [
    validarJWT,
    esAdminRole,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("nombre").custom(nombreProductoExiste),
    check("precio", "El precio del producto es obligatorio").not().isEmpty(),
    check("categorie", "No es un id válido").isMongoId(),
    check("categorie").custom(categoriaIdExiste),
    validarCampos,
  ],
  productsPost
);
router.put(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(productoIdExiste),
    validarCampos,
  ],
  productsPut
);
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(productoIdExiste),
    validarCampos,
  ],
  productsDelete
);

module.exports = router;
