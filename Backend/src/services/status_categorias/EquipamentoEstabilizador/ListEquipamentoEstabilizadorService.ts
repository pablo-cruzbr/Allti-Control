import prismaClient from "../../../prisma";

class ListEquipamentoEstabilizadorService{
    async execute(){
        const equipamento = await prismaClient.estabilizadores.findMany({
            orderBy: {
                created_at: "desc", 
                // Ordena do mais recente para o mais antigo
            },
            select: {
                id: true,
                name: true,
                patrimonio: true,
                created_at: true,
            }
        })
        return equipamento;
    }
}

export {ListEquipamentoEstabilizadorService}

