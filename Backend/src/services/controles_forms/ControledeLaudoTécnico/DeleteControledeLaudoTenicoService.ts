import prismaClient from "../../../prisma";

interface DeleteControledeLaudoTecnicoRequest {
  id: string;
}

class DeleteControledeLaudoTecnicoService {
  async execute({ id }: DeleteControledeLaudoTecnicoRequest ) {
    if (!id) {
      throw new Error("ID obrigatório para deletar o controle de assistência técnica.");
    }

    // Verifica se o registro existe antes de deletar
    const controleExists = await prismaClient.controleDeLaudoTecnico.findUnique({
      where: { id },
    });

    if (!controleExists) {
      throw new Error("Controle de Laudo técnico não encontrado.");
    }

    await prismaClient.controleDeLaudoTecnico.delete({
      where: { id },
    });

    return { message: "Controle de Laudo técnico deletado com sucesso." };
  }
}

export { DeleteControledeLaudoTecnicoService };
