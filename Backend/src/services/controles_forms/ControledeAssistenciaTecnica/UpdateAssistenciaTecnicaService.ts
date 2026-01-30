import prismaClient from "../../../prisma";

export interface UpdateAssistenciaTecnicaRequest {
    id: string;
    name: string;
    mesAno: Date;
    idChamado: string;
    assistencia: string;
    observacoes: string;
    osDaAssistencia: string;
    dataDeRetirada: Date;
    
    cliente_id: string;
    tecnico_id: string;
    instituicaoUnidade_id: string;
    equipamento_id: string;
    statusReparo_id: string;   
}

class UpdateAssistenciaTecnicaService {
  async execute({ 
    id, 
    name,
    mesAno, 
    idChamado,
    assistencia,
    observacoes,
    osDaAssistencia,
    dataDeRetirada,
    cliente_id,
    tecnico_id,
    instituicaoUnidade_id,
    equipamento_id,
    statusReparo_id

    }: UpdateAssistenciaTecnicaRequest  ) {
    if (!id) {
      throw new Error("ID obrigatório para deletar o card Assistencia Tecnica.");
    }

    // Verifica se o registro existe antes de atualizar
    const controle = await prismaClient.controleDeAssistenciaTecnica.findUnique({
      where: { id },
    });

    if (!controle) {
      throw new Error("Controle de Assistencia tecnica não encontrada.");
    }

    await prismaClient.controleDeAssistenciaTecnica.update({
      where: { id },
    data:{
        name,
        mesAno,
        idChamado,
        assistencia,
        observacoes,
        osDaAssistencia,
        dataDeRetirada,
        
        cliente_id,
        tecnico_id,
        instituicaoUnidade_id,
        equipamento_id,
        statusReparo_id
      },
    });

     const status = await prismaClient.controleDeAssistenciaTecnica.findUnique({
      where: { id },
      include: {
        cliente: {  
          select: {
            name: true,
          },
        },

        tecnico:{
          select:{
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
        statusReparo:{
            select:{
                name: true
            }
        }
        
      }
    });

    return { message: "Controle de Assistencia Técnica Atualizado com sucesso.", controle, status};
  }
}

export {UpdateAssistenciaTecnicaService };
