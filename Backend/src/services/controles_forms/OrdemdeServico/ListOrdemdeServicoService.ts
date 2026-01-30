import prismaClient from "../../../prisma";

class ListOrdemdeServicoService {
  async execute() {
    // Lista todas as ordens de serviço
    const controles = await prismaClient.ordemdeServico.findMany({
      orderBy: {
        created_at: "desc",
      },
      select: {
        id: true,
        numeroOS: true,
        name: true,
        descricaodoProblemaouSolicitacao: true,
        nomedoContatoaserProcuradonoLocal: true,
        created_at: true,
        updatedAt: true, 
        nameTecnico: true,
        diagnostico: true,
        solucao: true,
        assinante: true,
        equipamento:{
          select:{
            id: true,
            name: true,
            patrimonio: true,
          }
        },
        statusOrdemdeServico: {
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
        informacoesSetor:{
          select:{
            id: true,
            usuario: true,
            ramal: true,
            andar: true,
            setor: {
              select: {
                id: true,
                name: true,
                    },
                },
            instituicaoUnidade: {
              select:{
                id: true,
                name: true,
                endereco: true,
              }
            },
            cliente: {
              select: {
                id: true,
                name: true,
                endereco: true,
                cnpj: true
              }
            }
          }
        },
        cliente: {
          select: {
            id: true,
            name: true,
            endereco: true,
          },
        },
        tecnico: {
          select: {
            id: true,
            name: true,
          },
        },
        tipodeChamado: {
          select: {
            id: true,
            name: true,
          },
        },

        tipodeOrdemdeServico: {
          select:{
            id: true,
            name: true,
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,

            instituicaoUnidade: {
              select: {
                id: true,
                name: true,
                endereco: true,
              }
            },
            cliente: {
              select: {
                id: true,
                name: true,
                endereco: true,
              }
            },
          },
        },
      },
    });

    // Total de ordens
    const total = await prismaClient.ordemdeServico.count();

    // Totais por status
    const totalAberta = await prismaClient.ordemdeServico.count({
      where: {
        statusOrdemdeServico: {
          name: "ABERTA",
        },
      },
    });

    const totalEmAndamento = await prismaClient.ordemdeServico.count({
      where: {
        statusOrdemdeServico: {
          name: "EM ANDAMENTO",
        },
      },
    });

    const totalPausada = await prismaClient.ordemdeServico.count({
      where: {
        statusOrdemdeServico: {
          name: "PAUSADA",
        },
      },
    });

    const totalConcluida = await prismaClient.ordemdeServico.count({
      where: {
        statusOrdemdeServico: {
          name: "CONCLUIDA",
        },
      },
    });

    
    const totalTicket = await prismaClient.ordemdeServico.count({
      where: {
        tipodeOrdemdeServico: { 
          is: {
            name: "TICKET",
          },
        },
      },
    });

     const totalOrdemdeServico = await prismaClient.ordemdeServico.count({
      where: {
        tipodeOrdemdeServico: { 
          is: {
            name: "ORDEM DE SERVICO",
          },
        },
      },
    });

    return {
      controles,
      total,
      totalAberta,
      totalEmAndamento,
      totalConcluida,
      totalPausada,
      totalTicket,
      totalOrdemdeServico
    };
  }
}

export { ListOrdemdeServicoService };
