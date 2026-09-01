const prisma = require("./config/prisma")

async function main() {
    const usuario = await prisma.usuario.create({
        data: {
            nombre: "Haziel",
            edad: 20,
            carrera: "Ingeneria en Desarrollo de Tecnologias de Software"
        }
    })
    console.log(usuario)
}

main()