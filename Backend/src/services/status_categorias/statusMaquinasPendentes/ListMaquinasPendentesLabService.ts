import prismaClient from "../../../prisma";

class ListMaquinasPendentesLabService{
    async execute(){
        const status = await prismaClient.statusMaquinasPendentesLab.findMany({
            select:{
                id: true,
                name: true,
            }
        })
        return status;
    }
}

export {ListMaquinasPendentesLabService}