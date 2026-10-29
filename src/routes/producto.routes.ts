import { Router } from "express"
import { validarProducto } from "../middlewares/producto.middleware.js"
import { crearProducto, eliminarProducto, obtenerProductos, pruebaProducto } from "../controllers/producto.controller.js"

const router = Router()

router.post("/productos", validarProducto, crearProducto)
router.get("/productos", obtenerProductos)
router.delete("/productos/:id", eliminarProducto)
router.get("/productos12", pruebaProducto)

export default router