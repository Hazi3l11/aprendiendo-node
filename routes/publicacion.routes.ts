import { Router } from "express";
import { obtenerPublicaciones } from "../controllers/publicacion.controller.js";

const router = Router()

router.get("/publicaciones", obtenerPublicaciones)

export default router