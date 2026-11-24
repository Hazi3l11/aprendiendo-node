import type { Request, Response, NextFunction } from "express";
import { pedidoSchema } from "../schemas/pedido.schema.js"

export const validarPedido = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    
    const resultado = pedidoSchema.safeParse(req.body)

    if (!resultado.success) {
        return next(resultado.error)
    }

    req.validatedData = resultado.data

    next()
}