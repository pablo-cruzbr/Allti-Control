import prismaClient from "../../../prisma";

class ListstatusControlleLaboratioService{
    async execute(){
        const status = await prismaClient.statusControledeLaboratorio.findMany({
            select:{
                id: true,
                name: true,
            }
        })
        return status;
    }
}

export {ListstatusControlleLaboratioService}