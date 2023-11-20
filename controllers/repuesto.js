const Repuesto = require("../models/repuesto");

const getRepuestos = async(req,res) => {
    try{
        const repuestos = await Repuesto.find();
        res.status(200).json(repuestos);
    }catch(err){
        res.status(200).json({message:err});
    }
} 

const getRepuestoById = async(req,res) => {
    try{
        const repuesto = await Repuesto.findById(req.params.id);
        if(repuesto){
            res.status(200).json(repuesto);            
        }else{
            res.status(400).json({message:"Dato erroneos"});
        }

    }catch(err){
        res.status(500).json({message:err});
    }
}

const addRepuesto = async(req,res) => {
    const {marca,tipo,modeloImpresora,precio} = req.body;

    if(marca && tipo && modeloImpresora && precio){
        const newRepuesto = new Repuesto({marca,tipo,modeloImpresora,precio});

        try{
            await newRepuesto.save();
            res.status(201).json(newRepuesto);
        }catch(err){
            res.status(500).json({message:err});
        }
    }else{
        res.status(400).json({message:"Dato erroneos"});
    }
}

const deleteRepuesto = async(req,res) => {
    let id = req.params.id;
    if(id){
        try{
            const repuestoBuscar = await Repuesto.findById(id);
            if(repuestoBuscar){
                const repuestoBorrar = await Repuesto.findByIdAndDelete(id);;
                res.status(200).json(repuestoBorrar);
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

const updateRepuesto = async(req,res) => {
    let id = req.params.id;
    let repuestoModificado = req.body;
    if(id && repuestoModificado){
        try{
            const repuestoBuscar = await Repuesto.findById(id);
            if(repuestoBuscar){
                await Repuesto.findByIdAndUpdate(id,repuestoModificado);
                const repuestoActualizada = await Repuesto.findById(id);
                res.status(200).json(repuestoActualizada);
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

module.exports = {getRepuestos,getRepuestoById,addRepuesto,deleteRepuesto,updateRepuesto};