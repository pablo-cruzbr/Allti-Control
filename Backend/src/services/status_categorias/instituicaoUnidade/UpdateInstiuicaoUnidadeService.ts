import prismaClient from "../../../prisma";

interface InstituicaoRequest {
  id: string; 
  name: string;
  endereco: string;
  tipodeInstituicaoUnidade_id: string;
}

class UpdateInstituicaoUnidadeService {
  async execute({ id, name, endereco, tipodeInstituicaoUnidade_id }: InstituicaoRequest) {
    if (!id) {
      throw new Error('ID da Instituição é obrigatório para atualização.');
    }
    if (!name || name.trim() === '') {
      throw new Error('Nome inválido');
    }

    if (!endereco || endereco.trim() === '') {
      throw new Error('Endereço inválido');
    }

    if (!tipodeInstituicaoUnidade_id) {
      throw new Error('Tipo de Instituição é obrigatório');
    }

    try {
      const instituicao = await prismaClient.instituicaoUnidade.update({
        where: {
          id: id,
        },
        data: {
          name,
          endereco,
          tipodeinstituicaoUnidade_id: tipodeInstituicaoUnidade_id,
        },
        select: {
          id: true,
          name: true,
          endereco: true,
          tipodeinstituicaoUnidade_id: true,
        },
      });

      return instituicao;
    } catch (error) {
      throw new Error('Erro ao atualizar: Instituição não encontrada.');
    }
  }
}

export { UpdateInstituicaoUnidadeService };