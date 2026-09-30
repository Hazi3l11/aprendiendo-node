import { Router } from "express";
import { obtenerPublicaciones, crearPublicacion } from "../controllers/publicacion.controller.js";
import { validarSchema } from "../middlewares/validarSchema.middleware.js";
import { publicacionSchema } from "../schemas/publicacion.schema.js";

const router = Router()

router.get("/publicaciones", obtenerPublicaciones)
router.post("/publicaciones", validarSchema(publicacionSchema), crearPublicacion)

export default router