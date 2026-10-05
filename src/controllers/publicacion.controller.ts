import type { Request, Response } from "express";
import prisma from "../db.js";
import { publicacionInput } from "../schemas/publicacion.schema.js";

type PublicacionRequest = Request & {
    validatedData: publicacionInput
}

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

export const crearPublicacion = async (
    req: PublicacionRequest,
    res: Response
) => {
    try{
        const {titulo, contenido, usuarioId} = req.validatedData
        const usuario = await prisma.usuario.findUnique({
            where: {
                id: usuarioId
            }
        })

        if (!usuario) {
            return res.status(404).json({
                error: "Usuario no encontrado"
            })
        }

        const publicacion = await prisma.publicacion.create({
            data: {
                titulo,
                contenido,
                usuarioId
            }
        })
        
        res.status(201).json({
            mensaje: publicacion
        })

    }catch (error) {
        res.status(500).json({
            error: "Error el serviddor"
        })
    }
}
