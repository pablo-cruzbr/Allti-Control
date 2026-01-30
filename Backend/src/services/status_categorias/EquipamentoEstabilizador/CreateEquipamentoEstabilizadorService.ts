import prismaClient from "../../../prisma";

interface estabilizadorRequest{
    name: string;
    patrimonio: string;
}

class CreateEquipamentoEstabilizadorService{
    async execute(name, patrimonio){
        if(name === ''){
            throw new Error('Nome Invalido');
        }

        const estabilizador = prismaClient.estabilizadores.create({
            data:{
                name: name,
                patrimonio: patrimonio,
            },
            select:{
                id:true,
                name: true,
                patrimonio: true,
            }
        
        })
        return estabilizador
    }
}

export {CreateEquipamentoEstabilizadorService}