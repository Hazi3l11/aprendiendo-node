import type { Request, Response, NextFunction } from "express";
import { publicacionSchema } from "../schemas/publicacion.schema.js"

export const validarPublicacion = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    
    const resultado = publicacionSchema.safeParse(req.body)

    if (!resultado.success) {
        return res.status(400).json({
            error: resultado.error
        })
    }

    req.validatedData = resultado.data

    next()
}