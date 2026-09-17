import prisma from "./db.js"

const consulta1 = await prisma.usuario.findUnique({
    where: {
        id: 6
    },
    include: {
        publicaciones: {
            where: {
                id: 4
            }
        }
    }

})
console.log(consulta1)
const update = await prisma.usuario.update({
    where: {
        id: 6
    },
    data: {
        publicaciones: {
            update: {
                where: {
                    id: 4
                },
                data: {
                     titulo: "Institución de la religión cristiana — Libro I",
                     contenido: "Trata sobre el conocimiento de Dios en cuanto es Creador y supremo gobernador de todo el mundo"
                }
            }
        }
    }
})
console.log(update)

const consulta2 = await prisma.usuario.findUnique({
    where: {
        id: 6
    },
    include: {
        publicaciones: {
            where: {
                id: 4
            }
        }
    }

})
console.log(consulta2)
await prisma.$disconnect()