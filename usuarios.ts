type Usuario = {
    id: number
    nombre: string
    edad: number
    carrera: string
}

const usuarios: Usuario[] = [
    {
        id: 1,
        nombre: "Haziel",
        edad: 20,
        carrera: "Ingeniería de Software"
    },
    {
        id: 2,
        nombre: "Carlos",
        edad: 22,
        carrera: "Sistemas"
    },
    {
        id: 3,
        nombre: "Ana",
        edad: 21,
        carrera: "Contaduría"
    }
]

function mostrarUsuarios(usuarios: Usuario[]): void {

    for (const usuario of usuarios) {
        console.log(`ID: ${usuario.id}`)
        console.log(`Nombre: ${usuario.nombre}`)
        console.log(`Edad: ${usuario.edad}`)
        console.log(`Carrera: ${usuario.carrera}`)
        console.log("--------------------")
    }
}

function buscarUsuarioPorId(usuarios: Usuario[], id: number ) {
    const usuario = usuarios.find(u => u.id === id)
    return usuario
}

//mostrarUsuarios(usuarios)
console.log(buscarUsuarioPorId(usuarios, 7))