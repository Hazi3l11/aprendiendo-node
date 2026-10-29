import prisma from "../db.js"
import { Prisma } from "../../generated/prisma/client.js";
import { Request, Response } from "express"
import { pedidoInput, } from "../schemas/pedido.schema.js";

export const crearPedido = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id)
        const { cantidad } = req.validatedData as pedidoInput

        const producto = await prisma.producto.findUnique({
            where: {
                id: id
            }
        })

        if (!producto){
            throw new Error ("Producto no encontrado")
        }

        const resultadoPedido = await prisma.$transaction(async (tx)=> {
            const descuento = await tx.producto.updateMany({
            where: {
                id: id,
                stock: {
                    gte: cantidad
                }
            },
            data: {
                stock: {
                    decrement: cantidad
                }
            }
        })

         if(descuento.count === 0) {
            throw new Error ("Stock insuficiente")
        }

        const pedido = await tx.pedido.create({
            data: {
                cantidad: cantidad,
                productoId: id
            }
        })

        return pedido
    })

    return res.status(201).json({
        mensaje: "Pediddo creado con exito",
        pedido: resultadoPedido
    })
    }

    catch (error: any) {
        if (error.message === "Stock insuficiente"){
            return res.status(409).json({
                error: "Stock insuficiente"
            })
        } else if (error.message === "Producto no encontrado") {
            return res.status(404).json({
                error: "Producto no encontrado"
            })
        } else {
            return res.status(500).json({
            error: "Error interno del servidor"
        })
        }
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
        return res.status(404).json({
            error: "No hay pedidos"
        })
    }
}

export const eliminarPedido = async (
    req: Request,
    res: Response
) => {
    try{
        const id = Number(req.params.id)
        await prisma.pedido.delete({
            where: {
                id: id
            }
        })
        
        return res.status(204).send()

    } catch (error: unknown) {
        if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025")
            {
                return res.status(404).json({
                    error: "Pedido no encontrado"
                })
            } else {
                return res.status(500).json({
                     error: "Error interno del servidor"
                 })
            }
    }
}