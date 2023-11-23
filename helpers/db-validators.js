const Impresora3d = require("../models/impresora3d");

const existEmail = async (email)=>{
    const emailDb = await Impresora3d.findOne({email});
    if(emailDb){
        throw new Error(`Email ${email} already exists in database`);
    }
}

module.exports = {existEmail};