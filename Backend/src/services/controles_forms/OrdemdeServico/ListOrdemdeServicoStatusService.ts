import prismaClient from "../../../prisma";

interface TicketsRequest{
  statusOrdemdeServico_id: string;
}

class ListOrdemdeServicoStatusService{
  async execute({statusOrdemdeServico_id}: TicketsRequest){
    const findByCategory = await prismaClient.ordemdeServico.findMany({
      where:{
        statusOrdemdeServico_id: statusOrdemdeServico_id
      }
    })
    return findByCategory
  }
}

export {ListOrdemdeServicoStatusService}