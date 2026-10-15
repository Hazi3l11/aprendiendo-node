import prisma from "./src/db.js";

const prueba = async() => {
    let idUsuario: number | undefined
    try
    {
    const usuario = await prisma.usuario.create({
        data: {
            nombre: "Usuario de Prueba Atomica",
            edad: 20,
            carrera: "Pruebas"
        }
    })
    console.log(usuario)
    idUsuario = usuario.id
    if (usuario) {
        await prisma.usuario.update({
            where: {
                id:usuario.id
            },
            data: {
                edad: {
                    increment: 1
                }
            }
        })
        console.log(usuario)

        await prisma.usuario.update({
            where: { id: usuario.id},
            data: {edad: {decrement:1}}
        })
        console.log(usuario)
    }
        
    } catch (error) 
    {
        console.log("errode prueba", error)
    } finally 
    {
        if (idUsuario !== undefined){
             await prisma.usuario.delete({
                    where: {id: idUsuario}
            })
        }

        await prisma.$disconnect()
    }
}

prueba()