import prismaClient from "../../../prisma/index";

interface DetailRequest {
  controle_id: string;
}

class DetailDocumentacaoTecnicaService {
  async execute({ controle_id }: DetailRequest) {
    if (!controle_id) {
      throw new Error("O ID do controle é obrigatório!");
    }

    const controle = await prismaClient.documentacaoTecnica.findUnique({
      where: {
        id: controle_id,
      },
    });

    return controle;
  }
}

export { DetailDocumentacaoTecnicaService  };
