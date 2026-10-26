import prisma from "../db.js"
import { Request, Response } from "express"
import { productoInput } from "../schemas/producto.schema.js"

export const crearProducto = async (
    req: Request,
    res: Response
) => {
    try {
        const {nombre, stock} = req.validatedData as productoInput
        const producto = await prisma.producto.create({
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
        res.status(500).json({
            error: "Error interno del servidor"
        })
    }
}

export const obtenerProductos = async (
    req: Request,
    res: Response
) => {
    try {
        const productos = await prisma.producto.findMany()

        return res.status(200).json({
            productos: productos
        })
    }
    catch (error) {
        console.log(error)
    }
}

export const eliminarProducto = async (
    req: Request,
    res: Response
) => {
    try{
        const id = Number(req.params.id)
        const producto = await prisma.producto.delete({
            where: {
                id: id
            }
        })
        
        if (!producto) {
            return res.status(400).json({
                error: "Producto no encontrado"
            })
        }
        
        return res.status(204).send()

    }catch (error) {
        console.log("Error al eliminar producto", error)

        return res.status(500).json({
            error: "Error interno del servidor"
        })
    }
}