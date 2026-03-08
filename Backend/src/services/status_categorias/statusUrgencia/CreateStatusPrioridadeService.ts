import prismaClient from "../../../prisma";

interface UrgenciaCategoryRequest{
    name: string;
}

class CreateStatusPrioridadeService{
    async execute(name){
        if(name === ''){
            throw new Error('Name Invalid');
        }

        const category = prismaClient.prioridade.create({
            data: {
                name: name,
            },
        select:{
            id: true,
            name: true,
        }
        })
        return category;
    
    }
}

export {CreateStatusPrioridadeService}