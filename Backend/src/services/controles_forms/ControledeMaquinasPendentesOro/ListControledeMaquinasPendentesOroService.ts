import prismaClient from "../../../prisma";

class ListControledeMaquinasPendentesOroService {
  async execute() {
    const controles = await prismaClient.controledeMaquinasPendentesOro.findMany({
      orderBy: {
        created_at: "desc", // Ordena do mais recente para o mais antigo
      },
      select: {
        id: true,
        datadaInstalacao: true,
        osInstalacao: true,
        osRetirada: true,
        created_at: true,
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
        instituicaoUnidade:{
            select:{
                id: true,
                name: true,
                endereco: true
            }
        }
      },
    });
    const total = await prismaClient.controledeMaquinasPendentesOro.count();

    const totalDisponivel = await prismaClient.controledeMaquinasPendentesOro.count({
      where: {
        statusMaquinasPendentesOro:{
          name: "DISPONIVEL"
        }
      }
    });

    const totalInstalada = await prismaClient.controledeMaquinasPendentesOro.count({
      where: {
        statusMaquinasPendentesOro:{
          name: "INSTALADA"
        }
      }
    });

    const totalAguardandoRetirada = await prismaClient.controledeMaquinasPendentesOro.count({
      where: {
        statusMaquinasPendentesOro:{
          name: "AGUARDANDO RETIRADA"
        }
      }
    });

    const totalEmManutencao = await prismaClient.controledeMaquinasPendentesOro.count({
      where: {
        statusMaquinasPendentesOro:{
          name: "EM MANUTENÇÃO"
        }
      }
    });

    const totalReservada = await prismaClient.controledeMaquinasPendentesOro.count({
      where: {
        statusMaquinasPendentesOro:{
          name: "RESERVADA"
        }
      }
    });

    const totalDescartada = await prismaClient.controledeMaquinasPendentesOro.count({
      where: {
        statusMaquinasPendentesOro:{
          name: "DESCARTADA"
        }
      }
    });

    return {
      controles,
      total,
      totalAguardandoRetirada,
      totalDescartada,
      totalDisponivel,
      totalEmManutencao,
      totalInstalada
    };
  }
}

export { ListControledeMaquinasPendentesOroService };
