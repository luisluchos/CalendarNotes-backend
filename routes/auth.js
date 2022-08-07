/*
Rutas de usuarios /Auth
host + /api/auth
*/

const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { createUser, login, renewToken } = require("../controllers/auth");

router.post("/new",
[check("name", "El nombre es obligatorio").not().isEmpty(),
check("email", "El email es obligatorio").isEmail(),
check("password", "El password debe ser de 6 caracteres").isLength({ min: 6 })],
 createUser);

router.post("/", [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe ser de 6 caracteres").isLength({ min: 6 }),
], login);

router.get("/renew", renewToken);

module.exports = router;
