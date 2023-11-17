const mongoose = require("mogoose");
const Schema = mongoose.Schema;

const Impresora3dSchema = new Schema({
    marca:{
        type:String,
        required:true
    },
    modelo:{
        type:String,
        required:true
    },
    medida:{
        type:String,
        required:true
    },
    precio:{
        type:Number,
        required:true,
    }
})

module.exports = mongoose.model("Impresora3d",Impresora3dSchema);