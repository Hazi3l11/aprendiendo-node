import prisma from "./db.js";

const usuario = await prisma.usuario.update({
    where: {
        id: 2
    }, 
    data: {
        edad: 21,
        carrera: "Filosofia"
    }
})

console.log(usuario)

const prueba = await prisma.usuario.findUnique({
    where: {
        id: 2
    }
})

console.log(prueba)