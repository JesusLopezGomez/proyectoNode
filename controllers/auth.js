const jwt  = require("jsonwebtoken");
const usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const login = async(req,res) => {
    let {email,password} = req.body;
    if(email && password){
        try{
            const usuarioBuscar = await usuario.findOne({email});
            let validPassword = null;
            if(usuarioBuscar && usuarioBuscar.active){
                validPassword = bcryptjs.compareSync(password, usuarioBuscar.password);
            }
            if(validPassword){
                const payload = {uid: usuarioBuscar.id}
                const token = jwt.sign( payload,process.env.SECRET, {expiresIn: '4h'});
                res.status(200).json({usuarioBuscar,token});
            }else{
                res.status(400).json({message:"Email or password invalid..."});
            }



        }catch(err){
            console.log(err);
            res.status(500).json({message:err});
        }
    }else{
        res.status(400).json({message:"Dato erroneos"});
    }
}

module.exports = {login}