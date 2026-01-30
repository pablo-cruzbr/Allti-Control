import prismaClient from "../../../prisma"

class ListtipodeInstituicaoUnidadeService{
    async execute(){
        const status = await prismaClient.tipodeInstituicaoUnidade.findMany({
            select:{
                id: true,
                name:true,
            }
        })
        return status
    }
}

export {ListtipodeInstituicaoUnidadeService}

