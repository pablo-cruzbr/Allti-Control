import prismaClient from "../../../prisma";

class ListSetoresService {
    async execute(){
        const setores = await prismaClient.setor.findMany({
             orderBy: {
                created_at: "desc", 
                // Ordena do mais recente para o mais antigo
            },
            select:{
                id: true,
                name: true,
            }
        })
        return setores;
    }
}

export {ListSetoresService}