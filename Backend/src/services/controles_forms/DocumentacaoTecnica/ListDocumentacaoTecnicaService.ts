import prismaClient from "../../../prisma";

class ListDocumentacaoTecnicaService {
  async execute() {
    const controles = await prismaClient.documentacaoTecnica.findMany({
      orderBy: {
        created_at: "desc" // Ordena do mais recente para o mais antigo
      },
      select: {
        id: true,
        titulo: true,
        descricao: true,
        cliente_id: true,
        tecnico_id: true,
        instituicaoUnidade_id: true,
        created_at: true,
        tecnico: {
          select: {
            name: true, id: true
          }
        },
        cliente: {
          select: {
            name: true, id: true
          }
        },
        instituicaoUnidade: {
          select: {
            name: true, id: true
          }
        }
      }
    });

    return controles;
  }
}

export { ListDocumentacaoTecnicaService };
