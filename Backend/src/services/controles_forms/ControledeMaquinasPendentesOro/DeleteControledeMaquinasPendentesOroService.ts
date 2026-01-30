import prismaClient from "../../../prisma";

interface DeleteControledeMaquinasPendentesOroRequest {
  id: string;
}

class DeleteControledeMaquinasPendentesOroService {
  async execute({ id }:  DeleteControledeMaquinasPendentesOroRequest  ) {
    if (!id) {
      throw new Error("ID obrigatório para deletar o controle de assistência técnica.");
    }

    // Verifica se o registro existe antes de deletar
    const controleExists = await prismaClient.controledeMaquinasPendentesOro.findUnique({
      where: { id },
    });

    if (!controleExists) {
      throw new Error("Controle de Maquina pendente Oro não encontrado.");
    }

    await prismaClient.controledeMaquinasPendentesOro.delete({
      where: { id },
    });

    return { message: "Controle de Maquina pendente Oro deletado com sucesso." };
  }
}

export { DeleteControledeMaquinasPendentesOroService };
