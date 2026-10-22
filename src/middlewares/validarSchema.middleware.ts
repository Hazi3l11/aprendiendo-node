import type { Request, Response, NextFunction } from "express"
import type { ValidatedRequest } from "../types/validatedRequest.js"
import type { ZodType } from "zod"

export const validarSchema = <T>(schema: ZodType<T>) => {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const resultado = schema.safeParse(req.body)

        if (!resultado.success){
            return res.status(400).json({
                error: resultado.error
            })
        }
        req.validatedData = resultado.data

        next()
    }
}