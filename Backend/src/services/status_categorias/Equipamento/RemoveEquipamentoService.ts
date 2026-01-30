import prismaClient from "../../../prisma"

interface equipamentoRequest{
    equipamento_id: string;
}

class RemoveEquipamentoService{
    async execute({equipamento_id}: equipamentoRequest){
        const equipamento = prismaClient.equipamento.delete({
            where:{
                id: equipamento_id,
            }
        })

        return equipamento
    }
}

export {RemoveEquipamentoService}