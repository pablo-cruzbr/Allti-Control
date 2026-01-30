import prismaClient from "../../../prisma";

interface TecnicoRequest{
    tecnico_id: string;
}

class RemoveTecnicoService{
    async execute({tecnico_id}: TecnicoRequest){
        const  tecnico = prismaClient.tecnico.delete({
            where:{
                id: tecnico_id,
            }
        })
        return tecnico;
    }
}

export {RemoveTecnicoService}