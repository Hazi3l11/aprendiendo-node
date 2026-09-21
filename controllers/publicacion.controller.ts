import type { Request, Response } from "express";
import prisma from "../db.js";

export const obtenerPublicaciones = async (
    req: Request,
    res: Response
) => {
    const publicaciones = await prisma.publicacion.findMany({
        include: {
            usuario: true
        }
    })

    res.json(publicaciones)
}