import prisma from "./db.js"

const consulta = await prisma.$transaction(async (tx) => {
    const usuario = await tx.usuario.create({
        data: {
            nombre: "Platon",
            edad: 80,
            carrera: "Filosofia"
        }
    })

    const publicacion = await tx.publicacion.create({
        data: {
            titulo: "La Republica",
            contenido: "Reflecion sobre la justicia, educacion y organizacion de la ciudad",
            usuarioId: usuario.id
        }
    })

    return {
        usuario,
        publicacion
    }
})

console.log(consulta)

await prisma.$disconnect()