import prismaClient from "../../../prisma";

class ListControledeLaboratorioService{
    async execute(){
        const controles = await prismaClient.controleDeLaboratorio.findMany({
            orderBy: {
            created_at: "desc", 
        // Ordena do mais recente para o mais antigo
      },
         include: {
        equipamento: {
          select: {
            id: true,
            name: true,
            patrimonio: true        
          }
        },
        instituicaoUnidade:{
          select:{
            id: true,
            name: true,
            endereco: true}
        },
        cliente:{
          select: {
            id: true,
            name: true
          }
        },
	    statusControledeLaboratorio: {
          select: { 
            id: true,
            name: true },
        },
      },
        });

        const total = await prismaClient.controleDeLaboratorio.count();

        const totalAguardandoConserto = await prismaClient.controleDeLaboratorio.count({
          where: {
            statusControledeLaboratorio:{
              name: "AGUARDANDO CONSERTO",
            },
          }
        });

        const totalAguardandoOSdeLaboratorio = await prismaClient.controleDeLaboratorio.count({
          where: {
            statusControledeLaboratorio:{
              name: "AGUARDANDO O.S DE LABORATÓRIO",
            },
          }
        });

        const totalConcluido = await prismaClient.controleDeLaboratorio.count({
          where: {
            statusControledeLaboratorio:{
              name: "CONCLUIDO",
            },
          }
        })

        const totalAguardandoDevolucao = await prismaClient.controleDeLaboratorio.count({
          where: {
            statusControledeLaboratorio:{
              name: "AGUARDANDO DEVOLUÇÃO",
            },
          },
        });
        
        return {
          controles,
          total,
          totalAguardandoConserto,
          totalAguardandoDevolucao,
          totalAguardandoOSdeLaboratorio
        };
    }
}

export {ListControledeLaboratorioService}