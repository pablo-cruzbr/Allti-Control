import prismaClient from "../../../prisma";

class ListSolicitacaodeComprasService {
  async execute() {
    const controles = await prismaClient.solicitacaoDeCompras.findMany({
      orderBy: {
        created_at: "desc" // Ordena do mais recente para o mais antigo
      },
      select: {
        id: true,
        itemSolicitado: true,
        solicitante: true,
        motivoDaSolicitacao: true,
        preco: true,
        linkDeCompra: true,
       created_at: true,
        statusCompras: {
          select: {
            name: true, id: true
          },
        },
      }
    });

    const total = await prismaClient.solicitacaoDeCompras.count();

    const totalAguardandoCompra = await prismaClient.solicitacaoDeCompras.count({
      where: {
        statusCompras: {
        name: "AGUARDANDO COMPRA"
        },
      }
    });

    const totalAguardandoEntrega = await prismaClient.solicitacaoDeCompras.count({
      where: {
        statusCompras: {
        name: "AGUARDANDO ENTREGA"
        },
      }
    });

    const totalCompraFinalizada = await prismaClient.solicitacaoDeCompras.count({
      where: {
        statusCompras: {
        name: "COMPRA FINALIZADA"
        },
      }
    });

    return {
      controles,
      total,
      totalAguardandoCompra,
      totalAguardandoEntrega,
      totalCompraFinalizada
    };
  }
}

export { ListSolicitacaodeComprasService };
