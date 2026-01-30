import prismaclient from "../../prisma";
import bcrypt = require('bcryptjs')

interface UserRequest {
    name: string;
    email: string;
    password: string;
    cliente_id: string;
    setor_id: string;
    instituicaoUnidade_id: string; // igual ao banco
}

class CreateUserService{
    async execute({name, email, password, cliente_id, setor_id, instituicaoUnidade_id}: UserRequest){
        //1- Verificar se já existe um e-mail no banco
        if(!email){
            throw new Error("Email Incorreto !")
        }

        const userAlreadyExists = await prismaclient.user.findFirst({
            where:{
                email: email
            }
        })

        if(userAlreadyExists) {
            throw new Error("Esse email já existe !")
        }
    
        
        //2 - Criptografar a senha
        const passwordHash = await bcrypt.hash(password, 8);

        //3 - Criar e enviar para o banco
        const user = await prismaclient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash,

                cliente_id: cliente_id,
                setor_id: setor_id,
                instituicaoUnidade_id: instituicaoUnidade_id
            },
            select:{
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
                cliente:{
                    select:{
                        id: true,
                        name: true,
                        endereco: true
                    }
                },
                setor:{
                    select:{
                        id:true,
                        name: true,
                    }
                }


            }
        })

        return user;
    }

   
}

export {CreateUserService}