import prismaClient from "../../../prisma";

interface EquipamentoRequest{
    name: string;
    patrimonio: string;
    instituicaoUnidade_id?: string;
    tipodeEquipamento_id?: string;
}

class CreateEquipamentoService{
    async execute(name, patrimonio, instituicaoUnidade_id,  tipodeEquipamento_id){
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
                instituicaoUnidade_id: instituicaoUnidade_id,
                tipodeEquipamento_id:  tipodeEquipamento_id
            },

            select:{
                id: true,
                name: true,
                patrimonio: true,
                instituicaoUnidade_id: true,
                tipodeEquipamento_id: true
            }
        })
        return equipamento
    }
}

export {CreateEquipamentoService}