const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { emailExists, idExists } = require("../helpers/db-validators");
const { validateJWT } = require("../middlewares/validate-jwt");
const { isAdminRole } = require("../middlewares/validate-rol");
const {
  getUsers,
  getOneUser,
  createUser,
  editUser,
  deleteUser,
} = require("../controllers/users");

router.get("/", [validateJWT, isAdminRole, validateFields], getUsers);
router.get("/:id", [validateJWT, isAdminRole, validateFields], getOneUser);
router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "No es un correo válido").isEmail(),
    check("email").custom(emailExists),
    check("password", "La contraseña es obligatoria").not().isEmpty().trim(),
    check(
      "password",
      "La contraseña debe tener como minimo 6 caracteres"
    ).isLength({ min: 6, max: 12 }),
    check("province", "El nombre de la provincia es obligatorio")
      .not()
      .isEmpty(),
    check("location", "El nombre de la localidad es obligatorio")
      .not()
      .isEmpty(),
    check("shippingAddress", "La dirección es obligatoria").not().isEmpty(),
    check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    validateFields,
  ],
  createUser
);
router.put(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(idExists),
    validateFields,
  ],
  editUser
);
router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(idExists),
    validateFields,
  ],
  deleteUser
);

module.exports = router;
