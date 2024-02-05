const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const usuario = require("../models/usuario");


const validateJWT = async (req = request, res = response, next) => {
    
    const token = req.header("x-token");

    if(!token){
        return res.status(401).json({
            msg: "Token no válido - token no existe."
        });
    }

    
    try{
        const {uid} = jwt.verify(token, process.env.SECRET);

        const user = await usuario.findById(uid);

        if(!user){
            return res.status(401).json({
                msg: "Token no válido - usuario no existe en bd."
            });
        }

        if(!user.active){
            return res.status(401).json({
                msg: "Token no válido - usuario con estado false."
            });
        }

        req.user = user;
        next();
    }catch(error){
        console.log(error);
    }

}

module.exports = {validateJWT};