const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");


const getUsuario = async(req,res) => {
    try{
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    }catch(err){
        res.status(200).json({message:err});
    }
} 

const getUsuarioById = async(req,res) => {
    try{
        const usuario = await Usuario.findById(req.params.id);
        if(usuario){
            res.status(200).json(usuario);            
        }else{
            res.status(400).json({message:"Dato erroneos"});
        }

    }catch(err){
        res.status(500).json({message:err});
    }
}

const addUsuario = async(req,res) => {
    const {email,username,name,role,password} = req.body;
    if(email && username && name && role && password){
        const salt = bcryptjs.genSaltSync();
        const encryptedPassword = bcryptjs.hashSync( password, salt);
        
        const newUsuario = new Usuario({email,username,name,role:"ROLE_user",password:encryptedPassword,active:true});

        try{
            await newUsuario.save();
            res.status(201).json(newUsuario);
        }catch(err){
            console.log(err);
            res.status(500).json({message:err});
        }
    }else{
        res.status(400).json({message:"Dato erroneos"});
    }
}

const deleteUsuario = async(req,res) => {
    let id = req.params.id;
    if(id){
        try{
            const usuarioBuscar = await Usuario.findById(id);
            usuarioBuscar.active = false;
            if(usuarioBuscar){
                await Usuario.findByIdAndUpdate(id,usuarioBuscar);
                const usuarioActualizado = await Usuario.findById(id);
                res.status(200).json(usuarioActualizado);
            }else{
                res.status(400).json({message:"Dato erroneos"});
            }
        }catch(err){
            res.status(500).json({message:err});
        }
    }else{
        res.status(400).json({message:"Dato erroneos"});
    }
}

const updateUsuario = async(req,res) => {
    let id = req.params.id;
    let usuarioModificado = req.body;
    if(id && usuarioModificado){
        try{
            const usuarioBuscar = await Usuario.findById(id);
            if(usuarioBuscar){
                await Usuario.findByIdAndUpdate(id,usuarioModificado);
                const usuarioActualizado = await Usuario.findById(id);
                res.status(200).json(usuarioActualizado);
            }else{
                res.status(400).json({message:"Dato erroneos"});
            }
        }catch(err){
            res.status(500).json({message:err});
        }
    }else{
        res.status(400).json({message:"Dato erroneos"});
    }
}

const login = async(req,res) => {
    let {email,password} = req.body;
    if(email && password){
        try{
            const usuarioBuscar = await Usuario.findOne({email});
            let validPassword = null;
            if(usuarioBuscar){
                console.log(usuarioBuscar)
                validPassword = bcryptjs.compareSync(password, usuarioBuscar.password);
                console.log(password)
            }
            if(validPassword){
                res.status(200).json(usuarioBuscar);
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

module.exports = {getUsuario,getUsuarioById,addUsuario,deleteUsuario,updateUsuario,login};