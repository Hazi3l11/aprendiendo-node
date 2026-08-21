function validarUsuario (req, res, next) {
    if (!req.body.nombre || typeof req.body.nombre !== "string") {
        return res.status(400).json({
            mensaje: "Error en el nombre"
        })
    }
    next()
}

module.exports = {
    validarUsuario
}