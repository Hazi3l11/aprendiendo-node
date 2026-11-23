import { ErrorRequestHandler } from "express";
import { AppError } from "../errors/AppError.js";
import { ZodError  } from "zod";
import { Prisma } from "../../generated/prisma/client.js";

export const manejarErrores: ErrorRequestHandler = (
    error,
    req,
    res,
    next
) => {

    console.error(error)
    
    if ( error instanceof AppError) {
        return res.status(error.statusCode).json({
            error: error.message
        })
    }
    if (error instanceof ZodError) {
        return res.status(400).json({
            error: "Datos de entrada invalidos",
            details: error.issues.map(issue => ({
                field: issue.path.join("."),
                message: issue.message
                
            }))
        })
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case "P2002":
                return res.status(409).json({
                    error: "Ya existe un registro con esos datos"
                })
            case "P2003":
                return res.status(409).json({
                    error: "Conflicto de llave foranea"
                })
            case "P2025":
                return res.status(404).json({
                    error: "Registro no encontrado"
                })
            default: 
            return res.status(500).json({
                error: "Error interno del servidor"
            })
        }
    }
        return res.status(500).json({
        error: "Error interno del servidor"
    })
}