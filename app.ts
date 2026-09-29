import express from "express"
import usuarioRoutes from "./src/routes/usuario.routes.js"
import publicacionRoutes from "./src/routes/publicacion.routes.js"

const app = express()

app.use(express.json())

app.use(usuarioRoutes)
app.use(publicacionRoutes)

app.listen(3000, () => {
    console.log("Servidor ejecutándose en http://localhost:3000")
})