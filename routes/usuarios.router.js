const express = require("express")
const { obtenerUsuario, crearUsuario, actualizarUsuario, eliminarUsuario, remplazarUsuario } = require("../controllers/usuarios.controller")
const {validarUsuario} = require("../middlewares/usuarios.middlewares")
const router = express.Router()

router.get("/:id", obtenerUsuario)

router.post("/", validarUsuario, crearUsuario)

router.patch("/:id", actualizarUsuario)

router.put("/:id", remplazarUsuario)

router.delete("/:id", eliminarUsuario)

module.exports = router
