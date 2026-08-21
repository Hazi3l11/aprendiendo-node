

async function crearUsuario() {

    const respuesta = await fetch("http://localhost:3000/usuarios", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: 2
        })
        
    });

    const datos = await respuesta.json();

    console.log(datos);
}

async function eliminarUsuario() {

    const respuesta = await fetch("http://localhost:3000/usuarios/2", {
        method: "DELETE",      
    })

    const datos = await respuesta.json();

    console.log(datos);
}

async function actualizarUsuario() {
    const respuesta = await fetch("http://localhost:3000/usuarios/2", {
        method: "PATCH",

        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: "Dora Luz"
        })
        
    });

    const datos = await respuesta.json();

    console.log(datos);
}

async function remplazarUsuario() {
    const respuesta = await fetch("http://localhost:3000/usuarios/2", {
        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: "Dora Luz",
            edad: 21,
            carrera: "Software"
        })
        
    });

    const datos = await respuesta.json();

    console.log(datos);
}

//actualizarUsuario()
//eliminarUsuario()
//crearUsuario()
remplazarUsuario()