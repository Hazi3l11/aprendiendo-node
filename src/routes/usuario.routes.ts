import { Router } from "express"
import { validarUsuario } from "../middlewares/usuario.middleware.js"
import { obtenerUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } from "../controllers/usuario.controller.js"

const router = Router()

router.get("/usuarios", obtenerUsuarios)
router.post("/usuarios",validarUsuario, crearUsuario)
router.patch("/usuarios/:id", actualizarUsuario)
router.delete("/usuarios/:id", eliminarUsuario)

export default router