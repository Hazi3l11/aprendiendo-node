const express = require("express")
const router = require("./routes/usuarios.router")
const PORT = require("./config/env")

const app = express()



app.use(express.json()) 
app.use(registrarPeticion)

//app.get("/", (req, res) => {
//    res.send("Bienvenido a mi API")
//})

app.get("/", (req, res, next) => {
    next(new Error("Error de prueba"))
})


app.get("/usuarios", (req, res) => {
    const usuarios = [ 
        {
            id: 1,
            nombre: "Ana"
        },
        {
            id: 2,
            nombre: "Luis"
        }
    ]
    const id = Number(req.params.id)
    res.json(usuarios)
})

app.use("/usuarios", router)

app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500).json({
        mensaje: "Algo salió mal en el servidor"
    })
})
app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en ${PORT}`)
})

function registrarPeticion (req, res, next) {
    console.log(`${req.method} ${req.url}`)
    next()
}

