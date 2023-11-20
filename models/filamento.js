const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const filamentoSchema = new Schema({
    marca:{
        type:String,
        required:true
    },
    material:{
        type:String,
        required:true
    },
    peso:{
        type:Number,
        required:true
    },
    precio:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("filamento",filamentoSchema);