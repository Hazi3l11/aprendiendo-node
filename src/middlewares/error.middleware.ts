import { ErrorRequestHandler, NextFunction } from "express";

export const manejarErrores: ErrorRequestHandler = (
    error,
    req,
    res,
    next
) => {
    return res.status(500).json({
        error: "Error interno del servidor de prueba"
    })
}