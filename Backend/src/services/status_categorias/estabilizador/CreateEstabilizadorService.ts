import prismaClient from "../../../prisma";

interface EquipamentoRequest{
    name: string;
    patrimonio: string;
    instituicaoUnidade_id?: string;
}

class CreateEquipamentoService{
    async execute(name, patrimonio, instituicaoUnidade_id){
        if (name === ''){
            throw new Error('Name Invalid');
        }

        const equipamentoExistente = await prismaClient.estabilizadores.findFirst({
            where:{
                patrimonio: patrimonio
            }
        })
        
        if (equipamentoExistente){
            throw new Error('Esse patrimonio já existe!')
        }

        const equipamento = prismaClient.estabilizadores.create({
            data:{
                name:name,
                patrimonio: patrimonio,
                instituicaoUnidade_id: instituicaoUnidade_id
            },

            select:{
                id: true,
                name: true,
                patrimonio: true,
                instituicaoUnidade_id: true
            }
        })
        return equipamento
    }
}

export {CreateEquipamentoService}