import { Request, Response, NextFunction } from 'express';

export function can(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user_role; 

    if (!userRole) {
      return res.status(401).json({ error: "Não autenticado" });
    }

    const hasRole = roles.includes(userRole.toUpperCase());

    if (!hasRole) {
      return res.status(403).json({ error: "Acesso proibido: sua conta não tem permissão" });
    }

    return next();
  };
}