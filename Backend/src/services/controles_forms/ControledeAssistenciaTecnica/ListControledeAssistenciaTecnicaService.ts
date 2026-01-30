import prismaClient from "../../../prisma";

class ListControledeAssistenciaTecnicaService {
  async execute() {
    const controles = await prismaClient.controleDeAssistenciaTecnica.findMany({
      orderBy: {
        created_at: "desc", 
        // Ordena do mais recente para o mais antigo
      },
      include: {
        equipamento: {
          select: {name: true, patrimonio: true, id: true},

        },
        statusReparo:{
          select:{name: true, id: true}
        },
        instituicaoUnidade:{
          select:{name: true, id: true, endereco: true}
        },
        tecnico:{
          select: {name: true, id: true}
        },
        cliente:{
          select: {name: true, id: true}
        },
      },
    });

    const total = await prismaClient.controleDeAssistenciaTecnica.count();

    const totalAguardandoReparo = await prismaClient.controleDeAssistenciaTecnica.count({
      where: {
        statusReparo:{
          name: "AGUARDANDO REPARO",
        },
      },
    });

    const totalFinalizado = await prismaClient.controleDeAssistenciaTecnica.count({
      where:{
        statusReparo:{
        name: "REPARO FINALIZADO",
        }
      },
    });

    return {
    controles,
    total,
    totalAguardandoReparo,
    totalFinalizado
    }
  }   
}

export { ListControledeAssistenciaTecnicaService };
