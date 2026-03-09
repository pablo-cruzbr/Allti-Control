export async function isAdmin(req: Request, res: Response, next: NextFunction) {
    const user_id = req.user_id;

    const user = await prismaClient.user.findUnique({
        where: { id: user_id },
        select: { 
          isAdmin: true,
          role: true 
        }
    });

    // Se ele for admin pelo campo antigo OU pelo campo novo, ele passa!
    if (user?.isAdmin === true || user?.role === "ADMIN") {
        return next();
    }

    return res.status(403).json({ error: "Acesso restrito apenas administradores." });
}