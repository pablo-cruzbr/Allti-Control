import prismaClient from   "../../../prisma"

interface tipodeEquipamentoRequest{
    name: string;
}

class CreateTipodeEquipamentoService{
    async execute(name){
        if(name === ''){
            throw new Error('Name invalid');
        }

        const status = prismaClient.tipodeEquipamento.create({
            data:{
                name:name,
            },

            select:{
                id: true,
                name: true,
            }
        })
        return status;
    }a
}

export {CreateTipodeEquipamentoService}