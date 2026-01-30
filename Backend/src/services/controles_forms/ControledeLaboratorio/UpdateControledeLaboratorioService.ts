import prismaClient from "../../../prisma";

export interface UpdateAssistenciaTecnicaRequest {
    id: string;
    nomedoEquipamento: string;
    defeito: string;
    marca: string;
    osDeAbertura: string;
    osDeDevolucao: string;
    data_de_Chegada: Date;
    data_de_Finalizacao: Date;

    instituicaoUnidade_id: string;
    cliente_id: string;
    equipamento_id: string;
    statusControledeLaboratorio_id: string;
}

class UpdateControledeLaboratorioService {
  async execute({ 
    id,
    nomedoEquipamento,
    defeito,
    marca,
    osDeAbertura,
    osDeDevolucao,
    data_de_Chegada,
    data_de_Finalizacao,
    instituicaoUnidade_id,
    cliente_id,
    equipamento_id,
    statusControledeLaboratorio_id,

    }: UpdateAssistenciaTecnicaRequest  ) {
    if (!id) {
      throw new Error("ID obrigatório para deletar o card Assistencia Tecnica.");
    }

    // Verifica se o registro existe antes de atualizar
    const controle = await prismaClient.controleDeLaboratorio.findUnique({
      where: { id },
    });

    if (!controle) {
      throw new Error("Controle de Assistencia tecnica não encontrada.");
    }

    await prismaClient.controleDeLaboratorio.update({
      where: { id },
    data:{
       nomedoEquipamento,
        defeito,
        marca,
        osDeAbertura,
        osDeDevolucao,
        data_de_Chegada,
        data_de_Finalizacao,
        instituicaoUnidade_id,
        cliente_id,
        equipamento_id,
        statusControledeLaboratorio_id,
      },
    });

     const status = await prismaClient.controleDeLaboratorio.findUnique({
      where: { id },
      include: {
        cliente: {  
          select: {
            name: true,
          },
        },
        instituicaoUnidade:{
          select:{
            name: true,
            endereco: true
          }
        },
        equipamento:{
            select:{
                name: true,
                patrimonio: true
            }
        },
        statusControledeLaboratorio:{
            select:{
                name: true,
            }
        }
        
      }
    });

    return { message: "Controle de Assistencia Técnica Atualizado com sucesso.", controle, status};
  }
}

export {UpdateControledeLaboratorioService };
