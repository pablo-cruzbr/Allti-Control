import prismaClient from "../../../prisma/index";

interface DetailRequest {
  controle_id: string;
}

class DetailControledeMaquinasPendentesOroService {
  async execute({ controle_id }: DetailRequest) {
    if (!controle_id) {
      throw new Error("O ID do controle é obrigatório!");
    }

    const controle = await prismaClient.controledeMaquinasPendentesOro.findUnique({
      where: {
        id: controle_id,
      },
      include: {
        statusMaquinasPendentesOro: true,
      },
    });

    return controle;
  }
}

export { DetailControledeMaquinasPendentesOroService  };
