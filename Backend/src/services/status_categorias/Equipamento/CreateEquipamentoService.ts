import prismaClient from "../../../prisma";

interface EquipamentoRequest{
    name: string;
    patrimonio: string;
}

class CreateEquipamentoService{
    async execute(name, patrimonio){
        if (name === ''){
            throw new Error('Name Invalid');
        }

        const equipamentoExistente = await prismaClient.equipamento.findFirst({
            where:{
                patrimonio: patrimonio
            }
        })

        if (equipamentoExistente){
            throw new Error('Esse patrimonio já existe!')
        }

        const equipamento = prismaClient.equipamento.create({
            data:{
                name:name,
                patrimonio: patrimonio,
            },

            select:{
                id: true,
                name: true,
                patrimonio: true
            }
        })
        return equipamento
    }
}

export {CreateEquipamentoService}