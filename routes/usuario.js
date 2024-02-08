const express = require("express");
const router = express.Router();

const {check} = require("express-validator");

const {getUsuario,getUsuarioById,addUsuario,deleteUsuario,updateUsuario} = require("../controllers/usuario");

const { validateFields } = require("../middlewares/validateFields");
const { existEmailUsuario, existUsername, existId } = require("../helpers/db-validators");
const { validateJWT } = require("../middlewares/validateJwt");
const { hasRole } = require("../middlewares/validateRol");

router
.route("/")
.get(getUsuario)
.post([
    check("email","El email es de tipo Strign y no puede estar vacía").isString(),
    check("username","El nombre de usuario es de tipo Strign y no puede estar vacío").isString(),
    check("name","El nombre es de tipo String y no puede estar vacío").isString(),
    check("password","La contraseña es de tipo String y no puede estar vacía").isString(),
    check("password","La contraseña debe tener al menos 8 caracteres, una letra minúscula, una letra mayúscula, un número y un caracter especial.").matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$"),
    check("email").custom(existEmailUsuario),
    check("username").custom(existUsername)
    ,validateFields
    ]
    ,addUsuario);

router
.route("/:id")
.get([
    check("id","No es un id válido").isMongoId(),
    check("id").custom(existId),
    validateFields
]
,getUsuarioById)

.delete([
    validateJWT,
    hasRole("ROLE_admin"),
    check("id","No es un id válido").isMongoId(),
    check("id").custom(existId),
    validateFields
],
deleteUsuario)

.put([
    check("id","No es un id válido").isMongoId(),
    check("id").custom(existId),
    check("email","El email es de tipo Strign y no puede estar vacía").isString(),
    check("username","El nombre de usuario es de tipo Strign y no puede estar vacío").isString(),
    check("name","El nombre es de tipo String y no puede estar vacío").isString(),
    check("role","El role es de tipo String y no puede estar vacío").isString(),
    check("password","La contraseña es de tipo String y no puede estar vacía").isString(),
    check("password","La contraseña debe tener al menos 8 caracteres, una letra minúscula, una letra mayúscula, un número y un caracter especial.").matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$"),
    check("active","Active es de tipo boolean obligatorio").isBoolean(),
    check("email").custom(existEmailUsuario),
    check("username").custom(existUsername)
    ,validateFields
    ],
    updateUsuario);
    
module.exports = router;