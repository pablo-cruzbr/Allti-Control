import prismaClient from "../../../prisma";

class ListControledeEstabilizadoresService {
  async execute() {
    const controles = await prismaClient.controledeEstabilizadores.findMany({
      orderBy: {
        created_at: "desc", 
        // Ordena do mais recente para o mais antigo
      },
      include: {
        estabilizadores: {
          select: {name: true, patrimonio: true, id: true},

        },
        statusEstabilizadores:{
          select:{name: true, id: true}
        },
        instituicaoUnidade:{
          select:{name: true, id: true, endereco: true}
        },
      },
    });

    const total = await prismaClient.controledeEstabilizadores.count();

    const totalAguardandoReparo = await prismaClient.controledeEstabilizadores.count({
      where: {
        statusEstabilizadores:{
          name: "AGUARDANDO REPARO",
        },
      },
    });

    const totalFinalizado = await prismaClient.controledeEstabilizadores.count({
      where:{
        statusEstabilizadores:{
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

export { ListControledeEstabilizadoresService };
