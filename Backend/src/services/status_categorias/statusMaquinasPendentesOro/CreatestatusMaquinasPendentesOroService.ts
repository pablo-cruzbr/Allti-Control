import prismaClient from "../../../prisma";

interface MaquinasPendetesOroRequest{
    name: string;
}

class CreatestatusMaquinasPendentesOroService{
    async execute(name){
        if(name === ''){
            throw new Error('Name invalid');
        }

        const status = prismaClient.statusMaquinasPendentesOro.create({
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

export {CreatestatusMaquinasPendentesOroService}