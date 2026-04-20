import prismaClient from "../../../prisma";

interface ListRequest {
  user_id: string;
}

class ListOrdemdeServicoService {
  async execute({ user_id }: ListRequest) {
    
    const user = await prismaClient.user.findFirst({
      where: { id: user_id },
      select: {
        role: true,
        tecnico_id: true,
      }
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    let whereCondition: any = {};

    if (user.role === "TECNICO") {
      if (!user.tecnico_id) {
        return { 
          controles: [], total: 0, totalAberta: 0, totalEmAndamento: 0, 
          totalConcluida: 0, totalPausada: 0, totalTicket: 0, totalOrdemdeServico: 0 
        }; 
      }
      whereCondition.tecnico_id = user.tecnico_id;
    }

    const controles = await prismaClient.ordemdeServico.findMany({
      where: whereCondition,
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
        bannerassinatura: true,
        duracao: true,
        startedAt: true,
        endedAt: true,
        
        atividades: {
          select: {
            id: true,
            atividadePadrao: {
              select: { id: true, descricao: true, categoria: true }
            }
          }
        },

        equipamento:{
          select:{ id: true, name: true, patrimonio: true }
        },
        tarefa: {
          select: {id: true, name: true}
        },
        statusOrdemdeServico: {
          select: { id: true, name: true },
        },
        instituicaoUnidade: {
          select: { id: true, name: true, endereco: true },
        },
        informacoesSetor:{
          select:{
            id: true,
            usuario: true,
            ramal: true,
            andar: true,
            setor: { select: { id: true, name: true } },
            instituicaoUnidade: { select: { id: true, name: true, endereco: true } },
            cliente: { select: { id: true, name: true, endereco: true, cnpj: true } }
          }
        },
        cliente: {
          select: { id: true, name: true, endereco: true },
        },
        tecnico: {
          select: { id: true, name: true },
        },
        tipodeChamado: {
          select: { id: true, name: true },
        },
        tipodeOrdemdeServico: {
          select:{ id: true, name: true }
        },
        prioridade: {
          select:{ id: true, name: true }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            instituicaoUnidade: { select: { id: true, name: true, endereco: true } },
            cliente: { select: { id: true, name: true, endereco: true } },
          },
        },
      },
    });

    // 4. Seus contadores originais, agora respeitando a Role (whereCondition)
    const total = await prismaClient.ordemdeServico.count({
        where: whereCondition
    });

    const totalAberta = await prismaClient.ordemdeServico.count({
      where: {
        ...whereCondition,
        statusOrdemdeServico: { name: "ABERTA" },
      },
    });

    const totalEmAndamento = await prismaClient.ordemdeServico.count({
      where: {
        ...whereCondition,
        statusOrdemdeServico: { name: "EM ANDAMENTO" },
      },
    });

    const totalPausada = await prismaClient.ordemdeServico.count({
      where: {
        ...whereCondition,
        statusOrdemdeServico: { name: "PAUSADA" },
      },
    });

    const totalConcluida = await prismaClient.ordemdeServico.count({
      where: {
        ...whereCondition,
        statusOrdemdeServico: { name: "CONCLUIDA" },
      },
    });

    const totalTicket = await prismaClient.ordemdeServico.count({
      where: {
        ...whereCondition,
        tipodeOrdemdeServico: { name: "TICKET" },
      },
    });

    const totalOrdemdeServico = await prismaClient.ordemdeServico.count({
      where: {
        ...whereCondition,
        tipodeOrdemdeServico: { name: "ORDEM DE SERVICO" },
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