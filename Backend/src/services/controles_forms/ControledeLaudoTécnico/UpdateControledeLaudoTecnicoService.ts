import prismaClient from "../../../prisma";

type UpdateLaudoTecnicoRequest = {
  id: string;
  descricaodoProblema: string;
  mesAno: Date;
  osLab: string;
  tecnico_id: string;
  instituicaoUnidade_id: string;
  equipamento_id: string;
};

class UpdateControledeLaudoTecnicoService {
  async execute({
    id,
    descricaodoProblema,
    mesAno,
    osLab,
    tecnico_id,
    instituicaoUnidade_id,
    equipamento_id,
  }: UpdateLaudoTecnicoRequest) {
    if (!id) {
      throw new Error("ID obrigatório para atualizar o card Laudo Técnico.");
    }

    // garantir que existe
    const checkExists = await prismaClient.controleDeLaudoTecnico.findUnique({
      where: { id },
    });

    if (!checkExists) {
      throw new Error("Controle de Laudo Técnico não encontrado.");
    }

    // atualizar
    await prismaClient.controleDeLaudoTecnico.update({
      where: { id },
      data: {
        descricaodoProblema,
        mesAno: new Date(mesAno),
        osLab,
        tecnico_id,
        instituicaoUnidade_id,
        equipamento_id,
      },
    });

    // devolver o controle já populado
    const controle = await prismaClient.controleDeLaudoTecnico.findUnique({
      where: { id },
      include: {
        tecnico: {
          select: {
            id: true,
            name: true,
          },
        },
        instituicaoUnidade: {
          select: {
            id: true,
            name: true,
            endereco: true,
          },
        },
        equipamento: {
          select: {
            id: true,
            name: true,
            patrimonio: true,
          },
        },
      },
    });

    return {
      message: "Controle de Laudo Técnico atualizado com sucesso.",
      controle,
    };
  }
}

export { UpdateControledeLaudoTecnicoService };