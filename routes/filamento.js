const express = require("express");
const router = express.Router();

const {check} = require("express-validator");

//Métodos
const {getFilamentos,getFilamentoById,addFilamento,deleteFilamento,updateFilamento} = require("../controllers/filamento");
//ValidateFields
const { validateFields } = require("../middlewares/validateFields");

router
.route("/")
.get(getFilamentos)
.post([
    check("marca","La marca es de tipo Strign y no puede estar vacía").isString(),
    check("material","El material es de tipo Strign y no puede estar vacío").isString(),
    check("peso","El peso es de tipo Number y no puede estar vacío").isNumeric(),
    check("precio","El precio es de tipo Number y no puede estar vacío").isNumeric()
    ,validateFields
    ]
    ,addFilamento);

router
.route("/:id")
.get([
    check("id","No es un id válido").isMongoId(),
    validateFields
],
getFilamentoById)

.delete([
    check("id","No es un id válido").isMongoId(),
    validateFields
],
deleteFilamento)

.put([
    check("id","No es un id válido").isMongoId(),
    check("marca","La marca es de tipo Strign y no puede estar vacía").isString(),
    check("material","El material es de tipo Strign y no puede estar vacío").isString(),
    check("peso","El peso es de tipo Number y no puede estar vacío").isNumeric(),
    check("precio","El precio es de tipo Number y no puede estar vacío").isNumeric()
    ,validateFields
    ],
    updateFilamento);


module.exports = router;