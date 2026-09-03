import prisma from "./db.js"

const usuario = await prisma.usuario.findUnique({
    where: {
        id: 999
    }
})
const usuario2 = await prisma.usuario.findUnique({
    where: {
        id: 1
    }
})

if (usuario) {
    console.log(usuario.nombre)
}

if (usuario2) {
    console.log(usuario2.nombre)
}