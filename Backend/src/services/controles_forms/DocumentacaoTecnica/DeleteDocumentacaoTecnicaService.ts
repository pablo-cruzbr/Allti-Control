import prismaClient from "../../../prisma";

interface DeleteDocumentacaoTecnicaRequest {
  id: string;
}

class DeleteDocumentacaoTecnicaService {
  async execute({ id }: DeleteDocumentacaoTecnicaRequest  ) {
    if (!id) {
      throw new Error("ID obrigatório para deletar a Documentação técnica.");
    }

    // Verifica se o registro existe antes de deletar
    const controleExists = await prismaClient.documentacaoTecnica.findUnique({
      where: { id },
    });

    if (!controleExists) {
      throw new Error("Controle de Documentação técnica não encontrado.");
    }

    await prismaClient.documentacaoTecnica.delete({
      where: { id },
    });

    return { message: "Controle de Documentação técnica deletado com sucesso." };
  }
}

export { DeleteDocumentacaoTecnicaService };
