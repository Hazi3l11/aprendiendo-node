import prisma from "./db.js";

const usuarios = await prisma.usuario.findMany({
    include: {
        publicaciones: true
    }
});

console.log(usuarios);

await prisma.$disconnect()