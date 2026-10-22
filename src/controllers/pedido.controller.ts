import prisma from "../db.js"
import { Request, Response } from "express"
import { pedidoInput } from "../schemas/pedido.schema.js";

export const crearPedido = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id)
        const { cantidad } = req.validatedData as pedidoInput

        const realizarPedido = await prisma.$transaction(async (tx)=> {
        const pedido = await tx.pedido.create({
            data: {
                cantidad: cantidad,
                productoId: id
            }
        })

        const descuento = await tx.producto.updateMany({
            where: {
                id: id,
                stock: {
                    gte: pedido.cantidad
                }
            },
            data: {
                stock: {
                    decrement: pedido.cantidad
                }
            }
        })
        if(descuento.count === 0) {
            return res.status(409).json({
                error: "Stock insuficiente"
            })
        }

        return res.status(201).json({
            mensaje: pedido
        })
    })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "Error interno del servidor"
        })
    }
}