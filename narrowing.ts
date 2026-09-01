type ID = number | string

function mostrarID(id: ID) {

    if (typeof id === "string") {
        console.log(`ID de texto: ${id.toUpperCase()}`)
    } else {
        console.log(`ID numérico: ${id.toFixed(2)}`)
    }

}

mostrarID("abc123")
mostrarID(12345)

function mostrarDato ( dato: string | number | boolean) {
    if (typeof dato === "string"){
        console.log(dato.toUpperCase())
    } else if (typeof dato === "number") {
         console.log(dato * 2)
    } else {
        if (dato === true) {
            console.log("Es verdadero")
        }
        else {
            console.log("Es falso")
        }
    }
}

mostrarDato("hola")
mostrarDato(20)
mostrarDato(true)
mostrarDato(false)