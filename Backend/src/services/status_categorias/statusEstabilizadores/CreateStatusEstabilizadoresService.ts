import prismaClient from "../../../prisma";

interface statusMaquinasPendentesRequest{
    name: string;
}

class CreateStatusEstabilizadoresService{
    async execute(name){
        const status = prismaClient.statusEstabilizadores.create({
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

export {CreateStatusEstabilizadoresService}