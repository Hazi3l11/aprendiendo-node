const usuarios = require("../data/usuarios")

function obtenerUsuario(req, res){
    const id = Number(req.params.id)
    const usuario = usuarios.find(u => u.id === id)
    if (!usuario){
        return res.status(404).json({
            mensaje: "Usuario no encontrado"
        })
    }
    res.json(usuario)
}

function crearUsuario (req, res) {
    console.log(req.body)
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre
    }

    usuarios.push(nuevoUsuario)

    res.status(201).json({
        mensaje: "Usuario creado correctamente",
        usuario: nuevoUsuario
    })
}

function actualizarUsuario(req, res) {
    const id = Number(req.params.id)
    const usuario = usuarios.find(u => u.id === id)

    if (!usuario) {
        return res.status(404).json({
            mensaje: "Usuario no encontrado"
        });
    }
    Object.assign(usuario, req.body)

    res.status(200).json({
        mensaje: "Usuario modificado correctamente"
    })
}

function eliminarUsuario (req, res) {
    const id = Number(req.params.id)
    const indice = usuarios.findIndex(u => u.id === id)

    if (indice === -1) {
        return res.status(404).json({
            mensaje: "Usuario no encontrado"
        })
    }

    const usuario = usuarios[indice]

    usuarios.splice(indice, 1)
    res.status(200).json({
        mensaje: "Usuario eliminado correctamente",
        usuario
    })
}

function remplazarUsuario (req, res) {
    const id = Number(req.params.id)
    const usuario = usuarios.find(u => u.id === id)
    const indice = usuarios.findIndex(u => u.id === id)
    if (!usuario) {
        return res.status(404).json({
            mensaje: "Usuario no encontrado"
        });
    }
    if (!req.body.nombre || !req.body.edad || !req.body.carrera){
        return res.status(400).json({
            mensaje: "Datos incompletos"
        });
    }
        const usuarioActualizado = {
        id: usuario.id,
        nombre: req.body.nombre,
        edad: req.body.edad,
        carrera: req.body.carrera
    }
    usuarios[indice] = usuarioActualizado

    res.status(200).json({
        mensaje: "Usuario remplzado correctamente"
    })
}

module.exports = {
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    remplazarUsuario
}