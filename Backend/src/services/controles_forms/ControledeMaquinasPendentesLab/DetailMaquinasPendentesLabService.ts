import prismaClient from "../../../prisma/index";

interface DetailRequest {
  controle_id: string;
}

class DetailMaquinasPendentesLabService {
  async execute({ controle_id }: DetailRequest) {
    if (!controle_id) {
      throw new Error("O ID do controle é obrigatório!");
    }

    const controle = await prismaClient.controleDeMaquinasPendentesLaboratorio.findUnique({
      where: {
        id: controle_id,
      },
      include: {
        statusMaquinasPendentesLab:{
          select:{name: true}
        },
        equipamento:{
          select:{name: true}
        },
        instituicaoUnidade:{
          select:{name: true, endereco: true}
        }
      },
    });

    return controle;
  }
}

export { DetailMaquinasPendentesLabService };
