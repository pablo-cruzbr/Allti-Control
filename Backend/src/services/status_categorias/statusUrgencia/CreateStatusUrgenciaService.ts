import prismaClient from "../../../prisma";

interface UrgenciaCategoryRequest{
    name: string;
}

class CreateStatusUrgenciaService{
    async execute(name){
        if(name === ''){
            throw new Error('Name Invalid');
        }

        const category = prismaClient.urgencia.create({
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

export {CreateStatusUrgenciaService}