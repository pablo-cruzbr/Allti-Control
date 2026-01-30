import prismaClient from "../../../prisma/index";

interface DetailRequest {
  controle_id: string;
}

class DetailLaudoTecnicoService {
  async execute({ controle_id }: DetailRequest) {
    if (!controle_id) {
      throw new Error("O ID do controle é obrigatório!");
    }

    const controle = await prismaClient.controleDeLaudoTecnico.findUnique({
      where: {
        id: controle_id,
      },
      include: {
        equipamento: {
          select: {
            name: true,
            patrimonio: true,
          },
        },
        tecnico: {
          select: {
            name: true,
          },
        },
       
        instituicaoUnidade: {
          select: {
            name: true,
            endereco: true,
          },
        },
      },
    });

    return controle;
  }
}

export { DetailLaudoTecnicoService };
