const express = require("express");
const router = express.Router();

const {check} = require("express-validator");

const { validateFields } = require("../middlewares/validateFields");
const { validateJWT } = require("../middlewares/validateJwt");
const { renew } = require("../controllers/renew");

router.post([
    validateJWT,
    check("username","El nombre de usuario es de tipo Strign y no puede estar vacío").isString(),
    check("password","La contraseña es de tipo String y no puede estar vacía").isString(),
    ,validateFields
    ],renew);

module.exports = router;