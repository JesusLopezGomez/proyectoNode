const express = require("express");
const router = express.Router();

const {check} = require("express-validator");

const { validateFields } = require("../middlewares/validateFields");
const {login} = require("../controllers/auth");
const { validateJWT } = require("../middlewares/validateJwt");


router.post([
    validateJWT,
    check("username","El nombre de usuario es de tipo Strign y no puede estar vacío").isString(),
    check("password","La contraseña es de tipo String y no puede estar vacía").isString(),
    ,validateFields
    ],login);

module.exports = router;