import prismaClient from "../../../prisma";

interface DeleteControledeMaquinasPendentesLabRequest {
  id: string;
}

class DeleteControledeMaquinasPendentesLabService {
  async execute({ id }:  DeleteControledeMaquinasPendentesLabRequest  ) {
    if (!id) {
      throw new Error("ID obrigatório para deletar o controle de assistência técnica.");
    }

    // Verifica se o registro existe antes de deletar
    const controleExists = await prismaClient.controleDeMaquinasPendentesLaboratorio.findUnique({
      where: { id },
    });

    if (!controleExists) {
      throw new Error("Controle de Laudo técnico não encontrado.");
    }

    await prismaClient.controleDeMaquinasPendentesLaboratorio.delete({
      where: { id },
    });

    return { message: "Controle de Laudo técnico deletado com sucesso." };
  }
}

export { DeleteControledeMaquinasPendentesLabService };
