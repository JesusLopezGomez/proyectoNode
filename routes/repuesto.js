const express = require("express");
const router = express.Router();

const {check} = require("express-validator");

const {getRepuestos,getRepuestoById,addRepuesto,deleteRepuesto,updateRepuesto} = require("../controllers/repuesto");

const { validateFields } = require("../middlewares/validateFields");

router
.route("/")
.get(getRepuestos)
.post([
    check("marca","La marca es de tipo Strign y no puede estar vacía").isString(),
    check("tipo","El tipo es de tipo Strign y no puede estar vacío").isString(),
    check("modeloImpresora","El modeloImpresora es de tipo String y no puede estar vacío").isString(),
    check("precio","El precio es de tipo Number y no puede estar vacío").isNumeric()
    ,validateFields
    ]
    ,addRepuesto);

router
.route("/:id")
.get(getRepuestoById)
.delete(deleteRepuesto)
.put([
    check("id","No es un id válido").isMongoId(),
    check("marca","La marca es de tipo Strign y no puede estar vacía").isString(),
    check("tipo","El tipo es de tipo Strign y no puede estar vacío").isString(),
    check("modeloImpresora","El modeloImpresora es de tipo String y no puede estar vacío").isString(),
    check("precio","El precio es de tipo Number y no puede estar vacío").isNumeric()
    ,validateFields
    ],
    updateRepuesto);
module.exports = router;