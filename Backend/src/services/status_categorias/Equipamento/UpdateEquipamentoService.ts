import prismaClient from "../../../prisma";

interface EquipamentoUpdateRequest {
  id: string;
  name: string;
  patrimonio: string;
  instituicaoUnidade_id?: string; 
}

class UpdateEquipamentoService {
  async execute({ id, name, patrimonio, instituicaoUnidade_id }: EquipamentoUpdateRequest) {
    if (!id) {
      throw new Error('ID do equipamento é obrigatório para atualização!');
    }

    const equipamentoExists = await prismaClient.equipamento.findUnique({
      where: { id }
    });

    if (!equipamentoExists) {
      throw new Error('Equipamento não encontrado!');
    }

    if (patrimonio !== equipamentoExists.patrimonio) {
      const patrimonioDuplicado = await prismaClient.equipamento.findFirst({
        where: { patrimonio }
      });

      if (patrimonioDuplicado) {
        throw new Error('Este número de patrimônio já está em uso por outro equipamento!');
      }
    }

    const equipamento = await prismaClient.equipamento.update({
      where: { id },
      data: {
        name,
        patrimonio,
        instituicaoUnidade_id,
      },
      select: {
        id: true,
        name: true,
        patrimonio: true,
        instituicaoUnidade_id: true,
      }
    });

    return equipamento;
  }
}

export { UpdateEquipamentoService };