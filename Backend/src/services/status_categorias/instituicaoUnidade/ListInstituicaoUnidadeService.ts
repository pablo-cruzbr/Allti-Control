import prismaClient from "../../../prisma";

class ListInstituicaoUnidadeService {
  async execute() {
    const instituicoes = await prismaClient.instituicaoUnidade.findMany({
      orderBy: {
        created_at: "desc",
      },
      select: {
        id: true,
        name: true,
        endereco: true,
        created_at: true,
        // 🔹 Inclui o relacionamento
        tipodeinstituicaoUnidade: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const total = await prismaClient.instituicaoUnidade.count();

    return {
      instituicoes,
      total,
    };
  }
}

export { ListInstituicaoUnidadeService };
