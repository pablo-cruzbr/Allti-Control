import prismaClient from "../../../prisma";

type UpdateMaquinasPendentesOroRequest = {
  id: string;
  datadaInstalacao: string; 
  osInstalacao: string;
  osRetirada: string;
  equipamento_id: string;
  statusMaquinasPendentesOro_id: string;
  instituicaoUnidade_id: string;
};

class UpdateControledeMaquinasPendentesOroService {
  async execute({
    id,
    datadaInstalacao,
    osInstalacao,
    osRetirada,
    equipamento_id,
    statusMaquinasPendentesOro_id,
    instituicaoUnidade_id,
  }: UpdateMaquinasPendentesOroRequest) {
    if (!id) {
      throw new Error("ID obrigatório para atualizar o card de Máquinas Pendentes no Laboratório.");
    }

    const checkExists = await prismaClient.controledeMaquinasPendentesOro.findUnique({
      where: { id },
    });

    if (!checkExists) {
      throw new Error("Registro não encontrado.");
    }

    await prismaClient.controledeMaquinasPendentesOro.update({
      where: { id },
      data: {
        id,
        datadaInstalacao: new Date(datadaInstalacao), // <-- aqui faz a conversão
        osInstalacao,
        osRetirada,
        equipamento_id,
        statusMaquinasPendentesOro_id,
        instituicaoUnidade_id,
      },
    });

    const controle = await prismaClient.controledeMaquinasPendentesOro.findUnique({
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
        statusMaquinasPendentesOro: {
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

export { UpdateControledeMaquinasPendentesOroService };
