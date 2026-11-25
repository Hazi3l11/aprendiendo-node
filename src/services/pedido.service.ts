import prisma from "../db.js"
import { AppError } from "../errors/AppError.js"

export async function crearPedido (id: number, cantidad: number){
    const producto = await prisma.producto.findUnique({
            where: {
                id: id
            }
        })

    if (!producto){
        throw new AppError ("Producto no encontrado", 404)
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
            throw new AppError ("Stock insuficiente", 409)
        }

        const pedido = await tx.pedido.create({
            data: {
                cantidad: cantidad,
                productoId: id
            }
        })

        return pedido
    })

}