const jwt  = require("jsonwebtoken");

const renew = async(req,res) => {
    const user = req.user;
    try{
        if(user){
            const payload = {uid: user.id}
            const token = jwt.sign( payload,process.env.SECRET, {expiresIn: '4h'});
            res.status(200).json({user: user,token});
        }else{
            res.status(400).json({message:"Email or password invalid..."});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message:err});
    }
}

module.exports = {renew}