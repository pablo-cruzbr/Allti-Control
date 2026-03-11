// middleware/isAdmin.ts
import { NextFunction, Request, Response } from "express";
import prismaClient from "../prisma";

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
    const user_id = req.user_id;

    const user = await prismaClient.user.findUnique({
        where: { id: user_id },
        select: { 
            role: true 
        }
    });

    if (user?.role !== "ADMIN") {
        return res.status(403).json({ error: "Acesso restrito apenas administradores." });
    }

    return next();
}