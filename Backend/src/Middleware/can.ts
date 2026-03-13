import { Request, Response, NextFunction } from 'express';

export function can(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Agora o user_role virá preenchido pelo isAuthenticated
    const userRole = req.user_role; 

    if (!userRole) {
      return res.status(401).json({ error: "Permissão não identificada. Faça login novamente." });
    }

    // Verifica se a role do usuário está na lista de permissões permitidas
    const hasRole = roles.some(role => role.toUpperCase() === userRole.toUpperCase());

    if (!hasRole) {
      return res.status(403).json({ 
        error: "Acesso proibido: sua conta não tem nível de permissão suficiente." 
      });
    }

    return next();
  };
}