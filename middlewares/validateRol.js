const hasRole = async (req = request, res = response, next) => {
    
    if(req.user.role !== "ROLE_admin"){
        return res.status(401).json({
            msg: "Token no válido - no puedes realizar esta acción si no eres admin"
        });
    }

    next();
}

module.exports = {hasRole}