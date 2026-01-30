import prismaClient from "../../../prisma";

interface ControledeMPORequest {
  datadaInstalacao: string;
  osInstalacao: string;
  osRetirada: string;
  equipamento_id: string;
  statusMaquinasPendentesOro_id: string;
  instituicaoUnidade_id: string; 
}

class CreateControledeMaquinasPendentesOroService {
  async execute({
    datadaInstalacao,
    osInstalacao,
    osRetirada,
    equipamento_id,
    statusMaquinasPendentesOro_id,
    instituicaoUnidade_id, 
  }: ControledeMPORequest) {
    if (!datadaInstalacao || datadaInstalacao.trim() === "") {
      throw new Error("Insira a data de instalação!");
    }

    const controle = await prismaClient.controledeMaquinasPendentesOro.create({
      data: {
        datadaInstalacao: new Date(datadaInstalacao),
        osInstalacao,
        osRetirada,
        equipamento_id,
        statusMaquinasPendentesOro_id,
        instituicaoUnidade_id, 
      },
      include: {
        equipamento: {
          select: {
            name: true,
            patrimonio: true,
          },
        },
        statusMaquinasPendentesOro: {
          select: { name: true },
        },
      },
    });

    return controle;
  }
}

export { CreateControledeMaquinasPendentesOroService };
