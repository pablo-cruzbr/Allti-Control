import prismaClient from "../../../prisma"

class ListStatusComprasService{
    async execute(){
        const status = await prismaClient.statusCompras.findMany({
            select:{
                id: true,
                name: true,
            }
        })
        return status;
    }
}

export {ListStatusComprasService}