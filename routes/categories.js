const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  categoriaIdExiste,
  nombreCategoriaExiste,
} = require("../helpers/db-validators");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require("../middlewares/validar-rol");
const {
  categoriesGet,
  categorieGet,
  categoriesPost,
  categoriesPut,
  categoriesDelete,
} = require("../controllers/categories");

router.get("/", [], categoriesGet);
router.get("/:id", [], categorieGet);
router.post(
  "/",
  [
    validarJWT,
    esAdminRole,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("nombre").custom(nombreCategoriaExiste),
    validarCampos,
  ],
  categoriesPost
);
router.put(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(categoriaIdExiste),
    validarCampos,
  ],
  categoriesPut
);
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(categoriaIdExiste),
    validarCampos,
  ],
  categoriesDelete
);

module.exports = router;
