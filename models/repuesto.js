const mongoose = require("mogoose");
const Schema = mongoose.Schema;

const repuestoSchema = new Schema({
    marca:{
        type:String,
        required:true
    },
    tipo:{
        type:String,
        required:true
    },
    modeloImpresora:{
        type:String,
        required:true
    },
    precio:{
        type:Number,
        required:true
    },
})

module.exports = mongoose.model("repuesto",repuestoSchema);