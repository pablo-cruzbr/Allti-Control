import prismaClient from "../../../prisma";

interface TarefaCategoryRequest{
    name: string;
}

class CreateStatusTarefaService{
    async execute(name){
        if(name === ''){
            throw new Error('Name Invalid');
        }

        const category = prismaClient.tarefa.create({
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

export {CreateStatusTarefaService}