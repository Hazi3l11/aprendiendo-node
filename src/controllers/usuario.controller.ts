import type { Request, Response } from "express"
import prisma from "../db.js"
import { Prisma } from "../../generated/prisma/client.js"

export const obtenerUsuarios = async (
    req: Request,
    res: Response
) => {
    const usuarios = await prisma.usuario.findMany()

    res.json(usuarios)
}

export const crearUsuario = async (
    req: Request,
    res: Response
) => {
    const usuario = await prisma.usuario.create({
        data: {
            nombre: req.body.nombre,
            edad: req.body.edad,
            carrera: req.body.carrera
        }
    })

    res.status(201).json(usuario)
}

export const actualizarUsuario = async (
    req: Request,
    res: Response
) => {
    try{
    const id = Number(req.params.id)

    await prisma.usuario.update({
        where: {
            id: id
        },
        data: {
            carrera: req.body.carrera
        }
    })

    res.status(204).send()
    
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            res.status(404).send()
            return
        }
        res.status(500).send()
    }
}

export const eliminarUsuario = async (
    req: Request,
    res: Response
) => {
    const id = Number(req.params.id)

    await prisma.usuario.delete({
        where: {
            id: id
        }
    })

    res.status(204).send()
}