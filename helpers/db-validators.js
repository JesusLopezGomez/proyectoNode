const Impresora3d = require("../models/impresora3d");
const Usuario = require("../models/usuario");

const existEmail = async (email,{req})=>{
    const emailDb = await Impresora3d.findOne({email});
    if(emailDb && emailDb.id !== req.params.id){
        throw new Error(`Email ${email} already exists in database`);
    }

}

const existEmailUsuario = async (email,{req})=>{
    const emailDb = await Usuario.findOne({email});
    if(emailDb && emailDb.id !== req.params.id){
        throw new Error(`Email ${email} already exists in database`);
    }
}

const existUsername = async (username,{req})=>{
    const usernameDB = await Usuario.findOne({username});
    if(usernameDB && usernameDB.id !== req.params.id){
        throw new Error(`Username ${username} already exists in database`);
    }
}

const existId = async (id,{req})=>{
    const usernameDB = await Usuario.findById(id);
    if(!usernameDB){
        throw new Error(`This id ${id} dont exist`);
    }
}

module.exports = {existEmail,existEmailUsuario,existUsername,existId};