import prismaClient from "../../../prisma";

interface DeleteControledeLaboratorioRequest {
  id: string;
}


class DeleteControledeLaboratorioService {
  async execute({ id }: DeleteControledeLaboratorioRequest) {
    if (!id) {
      throw new Error("ID obrigatório para deletar o controle de Laboratorio.");
    }

    // Verifica se o registro existe antes de deletar
    const controleExists = await prismaClient.controleDeLaboratorio.findUnique({
      where: { id },
    });

    if (!controleExists) {
      throw new Error("Controle de Laboratorio não encontrado.");
    }

    await prismaClient.controleDeLaboratorio.delete({
      where: { id },
    });

    return { message: "Controle de Laboratorio deletado com sucesso." };
  }
}

export { DeleteControledeLaboratorioService };
