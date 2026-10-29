import express from "express"
import usuarioRoutes from "./src/routes/usuario.routes.js"
import publicacionRoutes from "./src/routes/publicacion.routes.js"
import pedidoRoutes from "./src/routes/pedido.routes.js"
import productoRoutes from "./src/routes/producto.routes.js"
import { manejarErrores } from "./src/middlewares/error.middleware.js"

const app = express()

app.use(express.json())

app.use(usuarioRoutes)
app.use(publicacionRoutes)
app.use(pedidoRoutes)
app.use(productoRoutes)

app.use(manejarErrores)

app.listen(3000, () => {
    console.log("Servidor ejecutándose en http://localhost:3000")
})