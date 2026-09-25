import { Router } from "express";
import { obtenerPublicaciones, crearPublicacion } from "../controllers/publicacion.controller.js";
import { validarPublicacion } from "../middlewares/publicacion.middleware.js";

const router = Router()

router.get("/publicaciones", obtenerPublicaciones)
router.post("/publicaciones", validarPublicacion, crearPublicacion)

export default router