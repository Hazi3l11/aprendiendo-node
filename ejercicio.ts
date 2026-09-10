import prisma from "./db.js";

const usuario = await prisma.usuario.create({
    data: {
        nombre: "Prueba",
        edad: "veinte",
        carrera: "Probalogia"
    }
})

console.log(usuario)