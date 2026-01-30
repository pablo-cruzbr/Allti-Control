import prismaClient from "../../../prisma";

interface ControlleLabRequest {
  name: string;
}

class CreateControlledeLaboratorioService {
  async execute(name: string): Promise<{ id: string; name: string }> {
    const status = await prismaClient.statusControledeLaboratorio.create({
      data: {
        name: name,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return status;
  }
}

export { CreateControlledeLaboratorioService };
