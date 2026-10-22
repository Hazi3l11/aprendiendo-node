import type { Request, Response, NextFunction } from "express";
import { usuarioSchema } from "../schemas/usuario.schema.js"

export const validarUsuario = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    
    const resultado = usuarioSchema.safeParse(req.body)

    if (!resultado.success) {
        return res.status(400).json({
            error: resultado.error
        })
    }

    req.validatedData = resultado.data

    next()
}