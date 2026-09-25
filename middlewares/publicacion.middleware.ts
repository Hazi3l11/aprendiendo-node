import type { Request, Response, NextFunction } from "express";

export const validarPublicacion = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.body.titulo === undefined || req.body.contenido === undefined || req.body.usuarioId === undefined) {
        return res.status(400).json({
            error: "Faltan datos"
        })
    }
    if (typeof req.body.titulo !== "string"){
        return res.status(400).json({
            error: "El titulo debe de ser texto"
        })
    }
    if (req.body.titulo.lenght <= 0 || req.body.titulo.lenght >= 100 ){
        return res.status(400).json({
            error: "El titulo debe tener minimo un 1 caracter y maximo 100"
        })
    }
    if (typeof req.body.contenido !== "string") {
        return res.status(400).json({
            error: "El contenido debe de ser texto"
        })
    }
    if (req.body.contenido.lenght <= 2 || req.body.contenido.lenght >= 200 ){
        return res.status(400).json({
            error: "El contenido debe tener mainimo 2 caracteres y maximo 200"
        })
    }
    if (typeof req.body.usuarioId !== "number"){
        return res.status(400).json({
            error: "El id del usuario debe ser un numero"
        })
    }
    if (req.body.usuarioId <= 0){
        return res.status(400).json({
            error: "El id del usuario debe ser mayor que 0"
        })
    }
    next()
}