const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Usuario = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    active:{
        type:Boolean,
        required:true
    },
})

Usuario.methods.toJSON = function(){
    const {__v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = mongoose.model("usuario",Usuario);