import prismaClient from "../../../prisma";

interface TicketsRequest{
  tecnico_id: string;
}

class ListOrdemdeServicoTecnicoService{
  async execute({tecnico_id}: TicketsRequest){
    const findByTecnico = await prismaClient.ordemdeServico.findMany({
      where:{
        tecnico_id: tecnico_id
      }
    })
    return findByTecnico
  }
}

export {ListOrdemdeServicoTecnicoService}