const express = require("express");
const router = express.Router();

const {check} = require("express-validator");

const {getUsuario,getUsuarioById,addUsuario,deleteUsuario,updateUsuario} = require("../controllers/usuario");

const { validateFields } = require("../middlewares/validateFields");
const { existEmailUsuario, existUsername } = require("../helpers/db-validators");

router
.route("/")
.get(getUsuario)
.post([
    check("email","El email es de tipo Strign y no puede estar vacía").isString(),
    check("username","El nombre de usuario es de tipo Strign y no puede estar vacío").isString(),
    check("name","El nombre es de tipo String y no puede estar vacío").isString(),
    check("role","El role es de tipo String y no puede estar vacío").isString(),
    check("password","La contraseña es de tipo String y no puede estar vacía").isString(),
    check("email").custom(existEmailUsuario),
    check("username").custom(existUsername)
    ,validateFields
    ]
    ,addUsuario);

router
.route("/:id")
.get([
    check("id","No es un id válido").isMongoId(),
    validateFields
]
,getUsuarioById)

.delete([
    check("id","No es un id válido").isMongoId(),
    validateFields
],
deleteUsuario)

.put([
    check("id","No es un id válido").isMongoId(),
    check("email","El email es de tipo Strign y no puede estar vacía").isString(),
    check("username","El nombre de usuario es de tipo Strign y no puede estar vacío").isString(),
    check("name","El nombre es de tipo String y no puede estar vacío").isString(),
    check("role","El role es de tipo String y no puede estar vacío").isString(),
    check("password","La contraseña es de tipo String y no puede estar vacía").isString(),
    check("email").custom(existEmailUsuario),
    check("username").custom(existUsername)
    ,validateFields
    ],
    updateUsuario);
    
module.exports = router;