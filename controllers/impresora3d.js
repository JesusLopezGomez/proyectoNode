const Impresora3d = require("../models/impresora3d");

const getImpresoras3d = async(req,res) => {
    try{
        const impresoras3d = await Impresora3d.find();
        res.status(200).json(impresoras3d);
    }catch(err){
        res.status(200).json({message:err});
    }
} 

const getImpresora3dById = async(req,res) => {
    try{
        const impresora3d = await Impresora3d.findById(req.params.id);
        if(impresora3d){
            res.status(200).json(impresora3d);            
        }else{
            res.status(400).json({message:"Dato erroneos"});
        }

    }catch(err){
        res.status(500).json({message:err});
    }
}

const addImpresora3d = async(req,res) => {
    const {marca,modelo,medida,email,precio} = req.body;

    if(marca && modelo && medida && precio){
        const newImpresora3d = new Impresora3d({marca,modelo,medida,email,precio});

        try{
            await newImpresora3d.save();
            res.status(201).json(newImpresora3d);
        }catch(err){
            res.status(500).json({message:err});
        }
    }else{
        res.status(400).json({message:"Dato erroneos"});
    }
}

const deleteImpresora3d = async(req,res) => {
    let id = req.params.id;
    if(id){
        try{
            const impresoraBuscar = await Impresora3d.findById(id);
            if(impresoraBuscar){
                const impresoraBorrar = await Impresora3d.findByIdAndDelete(id);;
                res.status(200).json(impresoraBorrar);
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

const updateImpresora3d = async(req,res) => {
    let id = req.params.id;
    let impresora3dModificada = req.body;
    if(id && impresora3dModificada){
        try{
            const impresoraBuscar = await Impresora3d.findById(id);
            if(impresoraBuscar){
                await Impresora3d.findByIdAndUpdate(id,impresora3dModificada);
                const impresoraActualizada = await Impresora3d.findById(id);
                res.status(200).json(impresoraActualizada);
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

module.exports = {getImpresoras3d,getImpresora3dById,addImpresora3d,deleteImpresora3d,updateImpresora3d};