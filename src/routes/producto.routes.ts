import { Router } from "express"
import { validarProducto } from "../middlewares/producto.middleware.js"
import { crearProducto } from "../controllers/producto.controller.js"

const router = Router()

router.post("/productos", validarProducto, crearProducto)

export default router