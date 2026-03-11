import prismaClient from "../../prisma";

class DetailUserService {
  async execute(user_id: string) {
    if (!user_id) {
      throw new Error("ID do usuário não fornecido");
    }

    const user = await prismaClient.user.findUnique({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,  
        setor: {
          select: {
            id: true,
            name: true,
          },
        },
        cliente: {
          select: {
            id: true,
            name: true,
            endereco: true,
          },
        },
        instituicaoUnidade: {
          select: {
            id: true,
            name: true,
            endereco: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }
}

export { DetailUserService };
