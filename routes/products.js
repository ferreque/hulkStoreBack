const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const {
  idProductExists,
  nameProductExists,
  idCategoryExists,
} = require("../helpers/db-validators");
const { validateJWT } = require("../middlewares/validate-jwt");
const { isAdminRole } = require("../middlewares/validate-rol");
const {
  getProducts,
  getOneProduct,
  createProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/products");

router.get("/", [validateJWT, validateFields], getProducts);

router.get("/:id", [validateJWT, validateFields], getOneProduct);
router.post(
  "/",
  [
    validateJWT,
    isAdminRole,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("name").custom(nameProductExists),
    check("price", "El precio del producto es obligatorio").not().isEmpty(),
    // check("categorie", "No es un id de categoria válido").isMongoId(),
    check("categorie").custom(idCategoryExists),
    validateFields,
  ],
  createProduct
);
router.put(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "No es un id de producto válido").isMongoId(),
    check("id").custom(idProductExists),
    validateFields,
  ],
  editProduct
);
router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "No es un id de producto válido").isMongoId(),
    check("id").custom(idProductExists),
    validateFields,
  ],
  deleteProduct
);

module.exports = router;
