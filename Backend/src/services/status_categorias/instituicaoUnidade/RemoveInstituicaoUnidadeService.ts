import prismaClient from "../../../prisma";

interface instituicaoRequest{
    instituicao_id: string;
}

class RemoveInstituicaoUnidadeService{
    async execute({instituicao_id}: instituicaoRequest){
        const instituicao = prismaClient.instituicaoUnidade.delete({
            where:{
                id: instituicao_id,
            }
        })
        return instituicao;
    }
}

export {RemoveInstituicaoUnidadeService}