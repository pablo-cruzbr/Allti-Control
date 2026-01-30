import prismaClient from "../../../prisma";

class ListTecnicoService {
  async execute() {
    const tecnicos = await prismaClient.tecnico.findMany({
      orderBy: {
        created_at: "desc", 
      },
      select: {
        id: true,
        name: true,
        created_at: true, // inclua se quiser exibir no frontend
      }
    });

    const total = await prismaClient.tecnico.count();

    return {
      controles: tecnicos,
      total,
    };
  }
}

export { ListTecnicoService };
