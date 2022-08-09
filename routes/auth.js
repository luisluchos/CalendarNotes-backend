/*
Rutas de usuarios /Auth
host + /api/auth
*/

const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const { createUser, login, renewToken } = require("../controllers/auth");
const {validateJWT} = require("../middlewares/validate-jwt");

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe ser de 6 caracteres").isLength({ min: 6 }),
    validateFields,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe ser de 6 caracteres").isLength({ min: 6 }),
    validateFields,
  ],
  login
);

router.get("/renew",[validateJWT] ,renewToken);

module.exports = router;
