import prisma from "../db.js"
import { Request, Response } from "express"
import { productoInput } from "../schemas/producto.schema.js"

export const crearProducto = async (
    req: Request,
    res: Response
) => {
    try {
        const {nombre, stock} = req.validatedData as productoInput
        const producto = prisma.producto.create({
            data: {
                nombre: nombre,
                stock: stock
            }
        })

        res.status(201).json({
            mensaje: producto
        })
    }
    catch (error) {
        console.log(error)
        res.status(500)
    }
}