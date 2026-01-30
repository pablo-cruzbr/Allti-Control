import prismaClient from "../../../prisma";

export interface UpdateSolicitacaodeComprasRequest {
  id: string;
  itemSolicitado: string;
  solicitante: string;
  motivoDaSolicitacao: string;
  preco: number;
  linkDeCompra: string;
  statusCompras_id: string;
}

class UpdateSolicitacaodeComprasService {
  async execute({ 
    id, 
    itemSolicitado,
    solicitante,
    motivoDaSolicitacao,
    preco,
    linkDeCompra,
    statusCompras_id

    }: UpdateSolicitacaodeComprasRequest  ) {
    if (!id) {
      throw new Error("ID obrigatório para deletar a Solicitacao de Compras.");
    }

    // Verifica se o registro existe antes de atualizar
    const controle = await prismaClient.solicitacaoDeCompras.findUnique({
      where: { id },
    });

    if (!controle) {
      throw new Error("Controle de Solicitacao de Compras não encontrada.");
    }

    await prismaClient.solicitacaoDeCompras.update({
      where: { id },
      data:{
        itemSolicitado,
        solicitante,
        motivoDaSolicitacao,
        preco,
        linkDeCompra,
        statusCompras_id
      },
    });

     const status = await prismaClient.solicitacaoDeCompras.findUnique({
      where: { id },
      include: {
        statusCompras: {  
          select: {
            name: true,
          }
        }
      }
    });

    return { message: "Controle de Solicitacao de Compras Atualizado com sucesso.", controle, status};
  }
}

export {UpdateSolicitacaodeComprasService };
