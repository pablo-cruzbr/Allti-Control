import prismaClient from "../../../prisma";

class ListControledeMaquinasPendentesLabService {
  async execute() {
    const controles = await prismaClient.controleDeMaquinasPendentesLaboratorio.findMany({
      orderBy: {
        created_at: "desc", // Ordena do mais recente para o mais antigo
      },
      select: {
        id: true,
        numeroDeSerie: true,
        ssd: true,
        idDaOs: true,
        obs: true,
        created_at: true,
        equipamento: {
          select: {
            id: true,
            name: true,
            patrimonio: true,
          },
        },
        statusMaquinasPendentesLab: {
          select: {
            id: true,
            name: true,
          },
        },

        instituicaoUnidade:{
          select:{
            id: true,
            name: true,
            endereco: true}
        },
      },
    });

    const total = await prismaClient.controleDeMaquinasPendentesLaboratorio.count();

    const totalPendenteOro = await prismaClient.
    controleDeMaquinasPendentesLaboratorio.count({
      where:{
        statusMaquinasPendentesLab: {
          name: "PENDENTE ORO",
        }
      }
    });

    const totalSubstituta = await prismaClient.
    controleDeMaquinasPendentesLaboratorio.count({
      where:{
        statusMaquinasPendentesLab: {
          name: "SUBSTITUTA",
        }
      }
    })

    return {
      controles,
      total,
      totalPendenteOro,
      totalSubstituta
    };
  }
}

export { ListControledeMaquinasPendentesLabService };
