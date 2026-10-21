import { error } from "node:console"
import prisma from "./src/db.js"

const producto = await prisma.producto.create({
    data: {
        nombre: "Confesiones de Agustin",
        stock: 5
    }
})
console.log(producto)
let pedido_id = undefined 

try {
    await prisma.$transaction(async (tx) => {
    const pedido = await tx.pedido.create({
        data: {
            cantidad: 9,
            productoId: producto.id
        }
    })
    console.log(pedido)
    pedido_id = pedido.id
    const resultado = await tx.producto.updateMany({
        where:{
            id: producto.id,
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

    if (resultado.count === 0) {
        throw new Error("Stock insuficiente")
    }
})
}
catch (error){
    console.log(error)
    pedido_id = undefined
}

const consulta = await prisma.producto.findUnique({
    where:{
        id: producto.id
    },
})

console.log(consulta)
if(pedido_id !== undefined) {
    await prisma.pedido.delete({
    where: {
        id: pedido_id
    }
})
await prisma.producto.delete({
    where: {
        id: producto.id
    }
})

}
await prisma.$disconnect()