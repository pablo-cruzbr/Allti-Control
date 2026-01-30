import prismaClient from "../../../prisma"

interface StatusComprasRequest{
    name: string;
}

class CreateStatusComprasService{
    async execute(name){
        const status = await prismaClient.statusCompras.create({
            data:{
                name: name,
            },
            select:{
                id: true,
                name: true,
            }
        })
        return status;
    }

}

export {CreateStatusComprasService}