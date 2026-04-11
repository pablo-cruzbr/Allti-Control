import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new Error("usuário ou senha está incorreta");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("usuário ou senha está incorreta");
        }

        const token = sign(
            {
                name: user.name,
                email: user.email,
                role: user.role,
                tecnico_id: user.tecnico_id 
            },
            process.env.JWT_SECREATE,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        );

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token,
            role: user.role,
            tecnico_id: user.tecnico_id 
        };
    }
}

export { AuthUserService };