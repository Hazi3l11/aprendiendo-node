import type {Request, Response, NextFunction } from "express"

export const validarUsuario = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if(req.body.nombre === undefined || req.body.edad === undefined || req.body.carrera === undefined) {
        return res.status(400).json({
            error: "Faltas datos obligatorios"
        })
    }
    if (typeof req.body.edad !== "number"){
        return res.status(400).json({
            error: "La edad debe ser un numero"
        })
    }
    if (typeof req.body.nombre !== "string"){
        return res.status(400).json({
            error: "El nombre debe ser un texto"
        })
    }
    if (typeof req.body.carrera !== "string"){
        return res.status(400).json({
            error: "La carrera debe ser un texto"
        })
    }
    if (req.body.edad <= 0){
        return res.status(400).json({
            error: "La edad debe ser mayor a 0"
        })
    }
    next()
}