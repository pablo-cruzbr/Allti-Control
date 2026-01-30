import prismaClient from "../../../prisma";

interface DeleteControledeAssistenciaTecnicaRequest {
  id: string;
}

class DeleteControledeAssistenciaTecnicaService {
  async execute({ id }: DeleteControledeAssistenciaTecnicaRequest) {
    if (!id) {
      throw new Error("ID obrigatório para deletar o controle de assistência técnica.");
    }

    // Verifica se o registro existe antes de deletar
    const controleExists = await prismaClient.controleDeAssistenciaTecnica.findUnique({
      where: { id },
    });

    if (!controleExists) {
      throw new Error("Controle de assistência técnica não encontrado.");
    }

    await prismaClient.controleDeAssistenciaTecnica.delete({
      where: { id },
    });

    return { message: "Controle de assistência técnica deletado com sucesso." };
  }
}

export { DeleteControledeAssistenciaTecnicaService };
