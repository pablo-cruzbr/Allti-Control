import prismaClient from "../../../prisma";

type UpdateMaquinasPendentesLabRequest = {
  id: string; 
  numeroDeSerie: string;
  ssd: string;
  idDaOs: string;
  obs: string;
  equipamento_id: string;
  statusMaquinasPendentesLab_id: string;
  instituicaoUnidade_id: string;
};

class UpdateControledeMaquinasPendentesLabService {
  async execute({
    id,
    numeroDeSerie,
    ssd,
    idDaOs,
    obs,
    equipamento_id,
    statusMaquinasPendentesLab_id,
    instituicaoUnidade_id
  }: UpdateMaquinasPendentesLabRequest) {
    if (!id) {
      throw new Error("ID obrigatório para atualizar o card de Máquinas Pendentes no Laboratório.");
    }

    const checkExists = await prismaClient.controleDeMaquinasPendentesLaboratorio.findUnique({
      where: { id },
    });

    if (!checkExists) {
      throw new Error("Registro não encontrado.");
    }

    await prismaClient.controleDeMaquinasPendentesLaboratorio.update({
      where: { id },
      data: {
        numeroDeSerie,
        ssd,
        idDaOs,
        obs,
        equipamento_id,
        statusMaquinasPendentesLab_id,
        instituicaoUnidade_id
      },
    });

    const controle = await prismaClient.controleDeMaquinasPendentesLaboratorio.findUnique({
      where: { id },
      include: {
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
        statusMaquinasPendentesLab: { // corrigido nome da relação
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return {
      message: "Controle de Máquinas Pendentes atualizado com sucesso.",
      controle,
    };
  }
}

export { UpdateControledeMaquinasPendentesLabService };
