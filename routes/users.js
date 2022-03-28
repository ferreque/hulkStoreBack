const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { emailExiste, idExiste } = require("../helpers/db-validators");
const {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
} = require("../controllers/users");

router.get("/", usersGet);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "No es un correo válido").isEmail(),
    check("email").custom(emailExiste),
    check("password", "La contraseña es obligatoria").not().isEmpty().trim(),
    check(
      "password",
      "La contraseña debe tener como minimo 6 caracteres"
    ).isLength({ min: 6, max: 12 }),
    check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    validarCampos,
  ],
  usersPost
);
router.put(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(idExiste),
    validarCampos,
  ],
  usersPut
);
router.delete(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(idExiste),
    validarCampos,
  ],
  usersDelete
);

module.exports = router;
