const Usuario = require("../models/usuario");

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
        const newUsuario = new Usuario({email,username,name,role,password});

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
            if(usuarioBuscar){
                const usuarioBorrar = await Usuario.findByIdAndDelete(id);;
                res.status(200).json(usuarioBorrar);
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

module.exports = {getUsuario,getUsuarioById,addUsuario,deleteUsuario,updateUsuario};