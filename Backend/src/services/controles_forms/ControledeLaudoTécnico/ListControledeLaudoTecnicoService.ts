import prismaClient from "../../../prisma";

class ListControledeLaudoTecnicoService {
  async execute() {
    const controles = await prismaClient.controleDeLaudoTecnico.findMany({
      orderBy: {
        created_at: "desc", // Ordena do mais recente para o mais antigo
      },
      select: {
        id: true,
        osLab: true,
        mesAno: true,
        descricaodoProblema: true,
        created_at: true,

        equipamento: {
          select: {
            id: true,
            name: true,
            patrimonio: true,
          },
        },
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
            endereco: true
          },
        },
      },
    });

    return controles;
  }
}

export { ListControledeLaudoTecnicoService };
