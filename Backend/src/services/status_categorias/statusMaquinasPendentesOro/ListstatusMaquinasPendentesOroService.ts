import prismaClient from "../../../prisma";

class ListMaquinasPendentesOroService{
    async execute(){
        const status = await prismaClient.statusMaquinasPendentesOro.findMany({
            select:{
                id: true,
                name: true,
            }
        })
        return status;
    }
}

export {ListMaquinasPendentesOroService}