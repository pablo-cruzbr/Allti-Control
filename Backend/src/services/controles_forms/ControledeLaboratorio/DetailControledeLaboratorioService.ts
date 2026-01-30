import prismaClient from "../../../prisma/index";

interface DetailRequest {
  controle_id: string;
}

class DetailControledeLaboratorioService {
  async execute({ controle_id }: DetailRequest) {
    if (!controle_id) {
      throw new Error("O ID do controle é obrigatório!");
    }

    const controle = await prismaClient.controleDeLaboratorio.findUnique({
      where: {
        id: controle_id,
      },
      include: {
        statusControledeLaboratorio: true,
      },
    });

    return controle;
  }
}

export { DetailControledeLaboratorioService };
