import prismaClient from "../../../prisma";
 

interface CategoryRequest{
    name: string;
}


interface CategoryRequest {
  name: string;
}

class CreateStatusReparoService {
  async execute({ name }: CategoryRequest) {
    const status = await prismaClient.statusReparo.create({
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

export {CreateStatusReparoService};