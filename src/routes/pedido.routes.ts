import { Router } from "express"
import { validarPedido } from "../middlewares/pedido.middleware.js"
import { crearPedido } from "../controllers/pedido.controller.js"

const router = Router()

router.post("/productos/:id/pedidos", validarPedido, crearPedido)

export default router