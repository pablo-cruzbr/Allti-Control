import prismaClient from "../../../prisma";

interface ListRequest {
  user_id: string;
  startDate?: string;
  endDate?: string;
  cliente_id?: string;
  instituicao_id?: string;
  tarefa_id?: string;
}

class ListOrdemdeServicoService {
  async execute({
    user_id,
    startDate,
    endDate,
    cliente_id,
    instituicao_id,
    tarefa_id,
  }: ListRequest) {
    const user = await prismaClient.user.findFirst({
      where: { id: user_id },
      select: {
        role: true,
        tecnico_id: true,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    // 1. Base dos filtros (Segurança e escopo)
    let whereCondition: any = {};

    if (user.role === "TECNICO") {
      if (!user.tecnico_id) {
        return {
          controles: [], total: 0, totalAberta: 0, totalEmAndamento: 0,
          totalConcluida: 0, totalPausada: 0, totalTicket: 0, totalOrdemdeServico: 0, totalEmDeslocamento: 0
        };
      }
      whereCondition.tecnico_id = user.tecnico_id;
    }

    // 2. Filtros dinâmicos (Período e Entidades)
    if (startDate || endDate) {
      whereCondition.created_at = {};
      if (startDate) whereCondition.created_at.gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setUTCHours(23, 59, 59, 999);
        whereCondition.created_at.lte = end;
      }
    }

    if (cliente_id) whereCondition.cliente_id = cliente_id;
    if (instituicao_id) whereCondition.instituicaoUnidade_id = instituicao_id;
    if (tarefa_id) whereCondition.tarefa_id = tarefa_id;

    // 3. Busca principal com filtro de exibição (Esconde "CONCLUIDA" na lista)
    const controles = await prismaClient.ordemdeServico.findMany({
      where: {
        ...whereCondition,
        statusOrdemdeServico_id: { not: "fa69ed32-20b2-4d3a-9a6d-e61c5b45efea" }
      },
      orderBy: { created_at: "desc" },
      // Lembre-se de manter o seu 'select' ou 'include' aqui
    });

    // 4. Contadores usando o whereCondition original (acesso a tudo)
    const [
      total,
      totalAberta,
      totalEmDeslocamento,
      totalEmAndamento,
      totalPausada,
      totalConcluida,
      totalTicket,
      totalOrdemdeServico,
    ] = await Promise.all([
      prismaClient.ordemdeServico.count({ where: whereCondition }),
      prismaClient.ordemdeServico.count({ where: { ...whereCondition, statusOrdemdeServico: { name: "ABERTA" } } }),
      prismaClient.ordemdeServico.count({ where: { ...whereCondition, statusOrdemdeServico: { name: "EM DESLOCAMENTO" } } }),
      prismaClient.ordemdeServico.count({ where: { ...whereCondition, statusOrdemdeServico: { name: "EM ANDAMENTO" } } }),
      prismaClient.ordemdeServico.count({ where: { ...whereCondition, statusOrdemdeServico: { name: "PAUSADA" } } }),
      prismaClient.ordemdeServico.count({ where: { ...whereCondition, statusOrdemdeServico: { name: "CONCLUIDA" } } }),
      prismaClient.ordemdeServico.count({ where: { ...whereCondition, tipodeOrdemdeServico: { name: "TICKET" } } }),
      prismaClient.ordemdeServico.count({ where: { ...whereCondition, tipodeOrdemdeServico: { name: "ORDEM DE SERVICO" } } }),
    ]);

    return {
      controles,
      total,
      totalAberta,
      totalEmDeslocamento,
      totalEmAndamento,
      totalConcluida,
      totalPausada,
      totalTicket,
      totalOrdemdeServico,
    };
  }
}

export { ListOrdemdeServicoService };