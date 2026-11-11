import { ErrorRequestHandler } from "express";
import { AppError } from "../errors/AppError.js";

export const manejarErrores: ErrorRequestHandler = (
    error,
    req,
    res,
    next
) => {

    console.log(error)
    
    if ( error instanceof AppError) {
        return res.status(error.statusCode).json({
            message: error.message
        })
    } else {
        return res.status(500).json({
        error: "Error interno del servidor"
    })
    }
}