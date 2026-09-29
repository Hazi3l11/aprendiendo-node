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

export const crearPublicacion = async (
    req: Request,
    res: Response
) => {
    try{
        const usuario = await prisma.usuario.findUnique({
            where: {
                id: req.body.usuarioId
            }
        })

        if (!usuario) {
            return res.status(404).json({
                error: "Usuario no encontrado"
            })
        }

        const publicacion = await prisma.publicacion.create({
            data: {
                titulo: req.body.titulo,
                contenido: req.body.contenido,
                usuarioId: usuario.id
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