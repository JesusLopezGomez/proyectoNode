const hasRole = (...roles) => async (req = request, res = response, next) => {
    if(!roles.includes(req.user.role)){
        return res.status(401).json({
            msg: `Token no válido - no puedes realizar esta acción si no eres ${roles.toString()}`
        });
    }

    next();
}

module.exports = {hasRole}