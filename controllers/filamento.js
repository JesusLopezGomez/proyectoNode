const Filamento = require("../models/filamento");

const getFilamentos = async(req,res) => {
    try{
        const filamentos = await Filamento.find();
        res.status(200).json(filamentos);
    }catch(err){
        res.status(200).json({message:err});
    }
} 

const getFilamentoById = async(req,res) => {
    try{
        const filamento = await Filamento.findById(req.params.id);
        if(filamento){
            res.status(200).json(filamento);            
        }else{
            res.status(400).json({message:"Dato erroneos"});
        }

    }catch(err){
        res.status(500).json({message:err});
    }
}

const addFilamento = async(req,res) => {
    const {marca,material,peso,precio} = req.body;

    if(marca && material && peso && precio){
        const newFilamento = new Filamento({marca,material,peso,precio});

        try{
            await newFilamento.save();
            res.status(201).json(newFilamento);
        }catch(err){
            res.status(500).json({message:err});
        }
    }else{
        res.status(400).json({message:"Dato erroneos"});
    }
}

const deleteFilamento = async(req,res) => {
    let id = req.params.id;
    if(id){
        try{
            const filamentoBuscar = await Filamento.findById(id);
            if(filamentoBuscar){
                const filamentoBorrar = await Filamento.findByIdAndDelete(id);;
                res.status(200).json(filamentoBorrar);
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

const updateFilamento = async(req,res) => {
    let id = req.params.id;
    let filamentoModificado = req.body;
    if(id && filamentoModificado){
        try{
            const filamentoBuscar = await Filamento.findById(id);
            if(filamentoBuscar){
                await Filamento.findByIdAndUpdate(id,filamentoModificado);
                const filamentoActualizada = await Filamento.findById(id);
                res.status(200).json(filamentoActualizada);
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

module.exports = {getFilamentos,getFilamentoById,addFilamento,deleteFilamento,updateFilamento};