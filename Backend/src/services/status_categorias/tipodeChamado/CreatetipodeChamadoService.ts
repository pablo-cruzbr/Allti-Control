import prismaClient from   "../../../prisma"

interface tipodeChamadoRequest{
    name: string;
}

class CreateTipodeChamadoService{
    async execute(name){
        if(name === ''){
            throw new Error('Name invalid');
        }

        const status = prismaClient.tipodeChamado.create({
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

export {CreateTipodeChamadoService}