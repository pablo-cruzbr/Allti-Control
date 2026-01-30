//Para modermos manipular o banco
import prismaClient from "../../../prisma/index";

interface DetailRequest{
    compra_id: string,

}

class DetailComprasService{
    async execute({compra_id}: DetailRequest) {


       const controle = await prismaClient.solicitacaoDeCompras.findUnique({
            where: {
                id: compra_id,
            },
            include:{
                statusCompras: true,
            }
    });
            return controle;
        
    }
}

export {DetailComprasService}

