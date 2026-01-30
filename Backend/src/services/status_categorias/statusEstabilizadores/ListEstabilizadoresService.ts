import prismaClient from "../../../prisma";

class ListEstabilizadoresService{
    async execute(){
        const status = await prismaClient.statusEstabilizadores.findMany({
            select:{
                id: true,
                name: true,
            }
        })
        return status;
    }
}

export {ListEstabilizadoresService}