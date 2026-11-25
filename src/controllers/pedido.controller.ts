import prisma from "../db.js"
import { Prisma } from "../../generated/prisma/client.js";
import { Request, Response } from "express"
import { pedidoInput, } from "../schemas/pedido.schema.js";
import { NextFunction } from "express";
import { crearPedido } from "../services/pedido.service.js";

export const crearPedidoEnDb = async (
    req: Request,
    res: Response
) => {
        const id = Number(req.params.id)
        const { cantidad } = req.validatedData as pedidoInput

        const pedido = await crearPedido(id,cantidad)
        

       return res.status(201).json({
        message: "Pedido creado",
        pedido
       })

    }

export const obtenerPedidos = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
        const pedidos = await prisma.pedido.findMany()
        return res.status(200).json({
            pedidos: pedidos
        })
}

export const eliminarPedido = async (
    req: Request,
    res: Response
) => {
  
        const id = Number(req.params.id)
        await prisma.pedido.delete({
            where: {
                id: id
            }
        })
        
        return res.status(204).send()

}
