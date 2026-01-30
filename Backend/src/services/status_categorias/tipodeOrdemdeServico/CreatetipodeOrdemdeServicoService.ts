import prismaClient from   "../../../prisma"

interface tipodeOrdemdeServicoRequest{
    name: string;
}

class CreateTipodeOrdemdeServicoService{
    async execute(name){
        if(name === ''){
            throw new Error('Name invalid');
        }

        const status = prismaClient.tipodeOrdemdeServico.create({
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

export {CreateTipodeOrdemdeServicoService}