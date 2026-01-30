import prismaClient from "../../../prisma";

interface TecnicoCategoryRequest{
    name: string;
}
class CreateTecnicoService{
    async execute(name){
        if(name === ''){
            throw new Error('Name Invalid');
        }

        const tecnicoCategory = prismaClient.tecnico.create({
            data: {
                name: name,
            },

            select:{
                id: true,
                name: true,
            }
        })
        return tecnicoCategory
    }
}

export {CreateTecnicoService}