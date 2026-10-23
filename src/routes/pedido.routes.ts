import { Router } from "express"
import { validarPedido } from "../middlewares/pedido.middleware.js"
import { crearPedido, eliminarPedido, obtenerPedidos } from "../controllers/pedido.controller.js"

const router = Router()

router.post("/productos/:id/pedidos", validarPedido, crearPedido)
router.get("/pedidos", obtenerPedidos)
router.delete("/pedidos/:id", eliminarPedido)

export default router