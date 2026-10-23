import prisma from "../db.js"
import { Request, Response } from "express"
import { pedidoInput, pedidoSchema } from "../schemas/pedido.schema.js";

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

export const obtenerPedidos = async (
    req: Request,
    res: Response
) => {
    try {
        const pedidos = await prisma.pedido.findMany()

        return res.status(200).json({
            pedidos: pedidos
        })
    }
    catch (error) {
        console.log(error)
    }
}

export const eliminarPedido = async (
    req: Request,
    res: Response
) => {
    try{
        const id = Number(req.params.id)
        const pedido = await prisma.pedido.delete({
            where: {
                id: id
            }
        })
        
        if (!pedido) {
            return res.status(400).json({
                error: "Pedido no encontrado"
            })
        }
        
        return res.status(204).send("Pedido eliminado")

    }catch (error) {
        console.log("Error al eliminar pedido", error)

        return res.status(500).json({
            error: "Error interno del servidor"
        })
    }
}