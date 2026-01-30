import prismaClient from "../../../prisma";

interface statusMaquinasPendentesRequest{
    name: string
}

class CreatestatusMaquinasPendentesService{
    async execute(name){
        const status = prismaClient.statusMaquinasPendentesLab.create({
            data:{
             name: name,
            },
            select:{
                id:true,
                name: true,
            }
        })
        return status;
    }
}

export {CreatestatusMaquinasPendentesService}