import prismaClient from   "../../../prisma"

interface tipodeInsituicaoUnidadeRequest{
    name: string;
}

class CreateTipodeInsituicaoUnidadeService{
    async execute(name){
        if(name === ''){
            throw new Error('Name invalid');
        }

        const status = prismaClient.tipodeInstituicaoUnidade.create({
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

export {CreateTipodeInsituicaoUnidadeService}