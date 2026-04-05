import prismaClient from "../../../prisma";

class ListEquipamentoService{
    async execute(){
        const equipamento = await prismaClient.equipamento.findMany({
            orderBy: {
                created_at: "desc", 
                // Ordena do mais recente para o mais antigo
            },
            select: {
                id: true,
                name: true,
                patrimonio: true,
                created_at: true,
                instituicaoUnidade: {
                select: {
                    id: true,
                    name: true,
                    endereco: true,
                    telefone: true,
                }
                },
                tipodeEquipamento: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })
        return equipamento;
    }
}

export {ListEquipamentoService}