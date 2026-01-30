import prismaClient from "../../../prisma";

interface statusOrdemdeServicoRequest{
    name: string;
}

class CreateStatusOrdemdeServicoService{
    async execute(name){
        if(name === ''){
            throw new Error('Name Invalid');
        }

        const status = prismaClient.statusOrdemdeServico.create({
            data:{
                name:name,             
            },
            select:{
                id: true,
                name: true,
            }
        })
        return status;
    }
}

export {CreateStatusOrdemdeServicoService}