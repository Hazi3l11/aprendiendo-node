import prisma from "../db.js"
import { Prisma } from "../../generated/prisma/client.js"
import { Request, Response } from "express"

export const crearPedido = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id)
        const realizarPedido = await prisma.$transaction(async (tx)=> {
        const pedido = await tx.pedido.create({
            data: {
                cantidad: req.body.cantidad,
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
            throw new Error ("Stock insuficiente")
        }
    })
    }
    catch (error) {
        console.log(error)
    }
}