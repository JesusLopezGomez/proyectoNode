const express = require("express");
const router = express.Router();

const {check} = require("express-validator");

//Métodos
const {getImpresoras3d,getImpresora3dById,addImpresora3d,deleteImpresora3d,updateImpresora3d} = require("../controllers/impresora3d");
//ValidateFields
const { validateFields } = require("../middlewares/validateFields");

router
.route("/")
.get(getImpresoras3d)
.post([
    check("marca","La marca es de tipo Strign y no puede estar vacía").isString(),
    check("modelo","El modelo es de tipo Strign y no puede estar vacío").isString(),
    check("medida","La medida es de tipo String y no puede estar vacía").isString(),
    check("precio","El precio es de tipo Number y no puede estar vacío").isNumeric()
    ,validateFields
    ]
    ,addImpresora3d);

router
.route("/:id")
.get(getImpresora3dById)
.delete(deleteImpresora3d)
.put([
    check("id","No es un id válido").isMongoId(),
    check("marca","La marca es de tipo Strign y no puede estar vacía").isString(),
    check("modelo","El modelo es de tipo Strign y no puede estar vacío").isString(),
    check("medida","La medida es de tipo String y no puede estar vacía").isString(),
    check("precio","El precio es de tipo Number y no puede estar vacío").isNumeric()
    ,validateFields
    ],
    updateImpresora3d);


module.exports = router;