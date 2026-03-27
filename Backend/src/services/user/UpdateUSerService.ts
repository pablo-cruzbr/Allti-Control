import prismaclient from "../../prisma";
import bcrypt = require('bcryptjs');

interface UserRequest {
    user_id: string; 
    name?: string;
    email?: string;
    password?: string;
    cliente_id?: string;
    setor_id?: string;
    instituicaoUnidade_id?: string; 
}

class UpdateUserService {
    async execute({ user_id, name, email, password, cliente_id, setor_id, instituicaoUnidade_id }: UserRequest) {
        
        const userExists = await prismaclient.user.findUnique({
            where: { id: user_id }
        });

        if (!userExists) {
            throw new Error("Usuário não encontrado!");
        }

        let data: any = {
            name,
            email,
            cliente_id,
            setor_id,
            instituicaoUnidade_id
        };

        if (password) {
            data.password = await bcrypt.hash(password, 8);
        }

        const user = await prismaclient.user.update({
            where: {
                id: user_id
            },
            data: data,
            select: {
                id: true,
                name: true,
                email: true,
                instituicaoUnidade: {
                    select: {
                        id: true,
                        name: true,
                        endereco: true
                    }
                },
                cliente: {
                    select: {
                        id: true,
                        name: true,
                        endereco: true
                    }
                },
                setor: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        });

        return user;
    }
}

export { UpdateUserService };