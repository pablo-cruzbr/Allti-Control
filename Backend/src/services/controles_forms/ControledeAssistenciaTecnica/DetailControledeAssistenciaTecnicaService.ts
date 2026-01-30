import prismaClient from "../../../prisma/index";

interface DetailRequest {
  controle_id: string;
}

class DetailAssistenciaTecnicaService {
  async execute({ controle_id }: DetailRequest) {
    if (!controle_id) {
      throw new Error("O ID do controle é obrigatório!");
    }

    const controle = await prismaClient.controleDeAssistenciaTecnica.findUnique({
      where: {
        id: controle_id,
      },
      include: {
        statusReparo: true,
      },
    });

    return controle;
  }
}

export { DetailAssistenciaTecnicaService };
