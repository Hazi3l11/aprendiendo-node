import type { Request, Response } from "express";
import prisma from "../db.js";
import { publicacionInput } from "../schemas/publicacion.schema.js";
import { Prisma } from "../../generated/prisma/client.js"

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
    req: Request,
    res: Response
) => {
    try{
        const {titulo, contenido, usuarioId} = req.validatedData as publicacionInput
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
         if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            res.status(404).send()
            return
        } else if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2003"
        ) {
            res.status(500).send()
            return
        }
        res.status(500).send()
    }
}

export const eliminarPublicacion = async (
    req: Request,
    res: Response
) => {
    try{
        const id = Number(req.params.id)
        await prisma.publicacion.delete({
            where: {
                id: id
            }
        })
        return res.status(204).send()

    }catch (error) {
        console.log("Error al eliminar publicacion", error)

        return res.status(500).json({
            error: "Error interno del servidor"
        })
    }
}
