const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const {
  idCategoryExists,
  nameCategoryExists,
} = require("../helpers/db-validators");
const { validateJWT } = require("../middlewares/validate-jwt");
const { isAdminRole } = require("../middlewares/validate-rol");
const {
  getCategories,
  getOneCategorie,
  createCategorie,
  editCategorie,
  deleteCategorie,
} = require("../controllers/categories");

router.get("/", [], getCategories);
router.get("/:id", [], getOneCategorie);
router.post(
  "/",
  [
    validateJWT,
    isAdminRole,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("name").custom(nameCategoryExists),
    validateFields,
  ],
  createCategorie
);
router.put(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(idCategoryExists),
    validateFields,
  ],
  editCategorie
);
router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(idCategoryExists),
    validateFields,
  ],
  deleteCategorie
);

module.exports = router;
