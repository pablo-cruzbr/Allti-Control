import prismaClient from "../../prisma";

class ListUserService {
  async execute() {
    const users = await prismaClient.user.findMany({
      orderBy: {
        created_at: "desc", 
      },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,

        setor: {
          select: {
            name: true
          }
        },

        instituicaoUnidade: {
          select: {
            id: true,
            name: true,
            endereco: true
          }
        },

        cliente: {
          select: {
            id: true,
            name: true,
            endereco: true
          }
        }
      }
    });

    const total = await prismaClient.user.count();

    const totalInsituicao = await prismaClient.instituicaoUnidade.count()

    const totalcliente = await prismaClient.cliente.count()

    return {
      users,
      total,
      totalInsituicao,
      totalcliente
    };
  }
}

export { ListUserService };
