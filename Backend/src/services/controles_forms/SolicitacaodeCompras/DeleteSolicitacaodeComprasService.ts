import prismaClient from "../../../prisma";

interface DeleteSolicitacaodeComprasRequest {
  id: string;
}

class DeleteSolicitacaodeComprasService {
  async execute({ id }: DeleteSolicitacaodeComprasRequest  ) {
    if (!id) {
      throw new Error("ID obrigatório para deletar a Solicitacao de Compras.");
    }

    // Verifica se o registro existe antes de deletar
    const controleExists = await prismaClient.solicitacaoDeCompras.findUnique({
      where: { id },
    });

    if (!controleExists) {
      throw new Error("Controle de Solicitacao de Compras não encontrado.");
    }

    await prismaClient.solicitacaoDeCompras.delete({
      where: { id },
    });

    return { message: "Controle de Solicitacao de Compras deletado com sucesso." };
  }
}

export { DeleteSolicitacaodeComprasService };
