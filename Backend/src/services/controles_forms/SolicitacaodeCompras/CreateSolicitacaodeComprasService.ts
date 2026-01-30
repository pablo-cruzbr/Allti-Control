import prismaClient from "../../../prisma";

interface SolicitacaodeComprasRequest {
  itemSolicitado: string;
  solicitante: string;
  motivoDaSolicitacao: string;
  preco: number;
  linkDeCompra: string;
  statusCompras_id: string;
}

class CreateSolicitacaodeComprasService {
    async execute({
        itemSolicitado,
        solicitante,
        motivoDaSolicitacao,
        preco,
        linkDeCompra,
        statusCompras_id
    }: SolicitacaodeComprasRequest){
       if (!itemSolicitado || itemSolicitado.trim() === "") {
            throw new Error("Insira o nome do item solicitado!");
        }


        const controle = await prismaClient.solicitacaoDeCompras.create({
            data:{
                itemSolicitado,
                solicitante,
                motivoDaSolicitacao,
                preco,
                linkDeCompra,
                statusCompras_id
            },
            include:{
                statusCompras:{
                    select:{name: true}
                }
            }
        })
        return controle;
    }
}

export {CreateSolicitacaodeComprasService}