import prisma from "./src/db.js";

const prueba = async() => {
    let idUsuario: number | undefined
    try
    {
    let usuario = await prisma.usuario.create({
        data: {
            nombre: "Usuario de Prueba Atomica",
            edad: 20,
            carrera: "Pruebas"
        }
    })
    console.log(usuario.edad)
    idUsuario = usuario.id

    const usuarioUpdated = await prisma.usuario.updateMany({
        where: {
            id: idUsuario,
            edad: {gte: 1}
        },
        data: {
            edad: { decrement: 1}
        }
    })

    if (usuarioUpdated.count === 1) {
        console.log("La actualizacion tuvo exito")
    } else {
        console.log("No se actualizo ningun usuario.")
    }

    const usuarioUpdated2 = await prisma.usuario.updateMany({
        where: {
            id: idUsuario,
            edad: {gte: 100}
        },
        data: {
            edad: {decrement: 1}
        }
    })
    
    if (usuarioUpdated2.count === 1) {
        console.log("La actualizacion tuvo exito")
    } else {
        console.log("No se actualizo ningun usuario.")
    }

    } catch (error) 
    {
        console.log("errode prueba", error)
    } finally 
    {
        await prisma.$disconnect()
    }
}

prueba()