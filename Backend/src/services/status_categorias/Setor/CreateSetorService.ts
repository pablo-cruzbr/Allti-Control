import prismaClient from "../../../prisma";

interface SetorRequest {
  name: string;
}

class CreateSetorService {
  async execute({ name}: SetorRequest) {
    
    if (name === "") {
      throw new Error("Setor inválido");
    }

    const setor = await prismaClient.setor.create({
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return setor;
  }
}

export { CreateSetorService };
