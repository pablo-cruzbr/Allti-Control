import prismaClient from "../../../prisma";

export interface UpdateEstabilizadoresRequest {
  id: string; 
  name: string;
  idChamado: string;
  problema: string;
  observacoes: string;
  osdaAssistencia: string;
  datadeChegada: string; 
  datadeRetirada: string;
  estabilizadores_id: string;
  statusEstabilizadores_id: string;
  instituicaoUnidade_id?: string;
}

class UpdateControledeEstabilizadoresService {
  async execute({
    id,
    name,
    idChamado,
    problema,
    observacoes,
    osdaAssistencia,
    datadeChegada,
    datadeRetirada,
    estabilizadores_id,
    statusEstabilizadores_id,
    instituicaoUnidade_id,
  }: UpdateEstabilizadoresRequest) {
    
    if (!id) {
      throw new Error("ID obrigatório para atualizar o Controle de Estabilizadores.");
    }

    // Verifica se o registro existe antes de atualizar
    const controle = await prismaClient.controledeEstabilizadores.findUnique({
      where: { id },
    });

    if (!controle) {
      throw new Error("Controle de Estabilizadores não encontrado.");
    }

    await prismaClient.controledeEstabilizadores.update({
      where: { id },
      data: {
        idChamado,
        problema,
        observacoes,
        osdaAssistencia,
        datadeChegada,
        datadeRetirada,
        estabilizadores_id,
        statusEstabilizadores_id,
        instituicaoUnidade_id, 
      },
    });

    const status = await prismaClient.controledeEstabilizadores.findUnique({
      where: { id },
      include: {
        instituicaoUnidade: {
          select: {
            id: true,
            name: true,
            endereco: true,
          },
        },
        estabilizadores: {
          select: {
            id: true,
            name: true,
            patrimonio: true,
          },
        },
        statusEstabilizadores: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return { 
      message: "Controle de Estabilizadores atualizado com sucesso.", 
      status 
    };
  }
}

export { UpdateControledeEstabilizadoresService };
