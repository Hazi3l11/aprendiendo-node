import { Router } from "express"
import { obtenerUsuarios, crearUsuario } from "../controllers/usuario.controller.js"

const router = Router()

router.get("/usuarios", obtenerUsuarios)
router.post("/usuarios", crearUsuario)

export default router