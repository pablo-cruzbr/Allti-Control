import { Request, Response, NextFunction } from 'express';

export function can(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user_role; 

    if (!userRole) {
      return res.status(401).json({ error: "Permissão não identificada. Faça login novamente." });
    }

    const hasRole = roles.some(role => role.toUpperCase() === userRole.toUpperCase());

    if (!hasRole) {
      return res.status(403).json({ 
        error: "Acesso proibido: sua conta não tem nível de permissão suficiente." 
      });
    }

    return next();
  };
}