import type { Request, Response } from "express";
import prisma from "../db.js";
import { publicacionInput } from "../schemas/publicacion.schema.js";
import { ValidatedRequest } from "../types/validatedRequest.js";

export type PublicacionResponse = {
    id: number,
    titulo: string,
    contenido: string,
    autor: string
}

export const obtenerPublicaciones = async (
    req: Request,
    res: Response
) => {
    try {
        const publicaciones = await prisma.publicacion.findMany({
        include: {
            usuario: true
        }
    })

    const respuesta: PublicacionResponse[] = publicaciones.map((publicacion) => ({
        id: publicacion.id,
        titulo: publicacion.titulo,
        contenido: publicacion.contenido,
        autor: publicacion.usuario.nombre
    }))

    res.json(respuesta)
    } catch(error) {
        console.log("Error al consultar publicaciones", error)

        return res.status(500).json({
            error: "Error interno del servidor"
        })
    }
}

export const crearPublicacion = async (
    req: ValidatedRequest<publicacionInput>,
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
