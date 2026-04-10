import prismaClient from "../../../prisma";

interface ListRequest {
  categoria?: "EXTERNO" | "LABORATORIO";
}

class ListAtividadePadraoService {
  async execute({ categoria }: ListRequest) {
    const atividades = await prismaClient.atividadePadrao.findMany({
      where: {
        categoria: categoria ? categoria : undefined,
      },
      select: {
        id: true,
        descricao: true,
        categoria: true,
      }
    });

    return atividades;
  }
}

export { ListAtividadePadraoService };