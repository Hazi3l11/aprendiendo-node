import { Router } from "express"
import { validarPedido } from "../middlewares/pedido.middleware.js"
import { crearPedidoEnDb, eliminarPedido, obtenerPedidos } from "../controllers/pedido.controller.js"

const router = Router()

router.post("/productos/:id/pedidos", validarPedido, crearPedidoEnDb)
router.get("/pedidos", obtenerPedidos)
router.delete("/pedidos/:id", eliminarPedido)

export default router