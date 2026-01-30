import prismaClient from "../../../prisma";

interface setorRequest{
    setor_id: string;
}

class RemoveSetorService{
    async execute({setor_id}: setorRequest){
        const setor = prismaClient.setor.delete({
            where:{
                id: setor_id,
            }
        })
        return setor;
    }
   
}

export {RemoveSetorService}