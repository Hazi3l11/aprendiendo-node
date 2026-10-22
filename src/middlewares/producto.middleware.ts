import type { Request, Response, NextFunction } from "express";
import { productoSchema } from "../schemas/producto.schema.js"

export const validarProducto = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    
    const resultado = productoSchema.safeParse(req.body)

    if (!resultado.success) {
        return res.status(400).json({
            error: resultado.error
        })
    }

    req.validatedData = resultado.data

    next()
}