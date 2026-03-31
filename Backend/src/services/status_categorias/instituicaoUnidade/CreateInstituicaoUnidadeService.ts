import prismaClient from "../../../prisma";

interface InstituicaoRequest {
  name: string;
  endereco: string;
  telefone: string;
  tipodeInstituicaoUnidade_id: string;
}

class CreateInstituicaoUnidadeService {
  async execute({ name, endereco, tipodeInstituicaoUnidade_id, telefone }: InstituicaoRequest) {
    if (!name || name.trim() === '') {
      throw new Error('Nome inválido');
    }

    if (!endereco || endereco.trim() === '') {
      throw new Error('Endereço inválido');
    }

    if (!tipodeInstituicaoUnidade_id) {
      throw new Error('Tipo de Instituição é obrigatório');
    }

    const instituicao = await prismaClient.instituicaoUnidade.create({
      data: {
        name,
        endereco,
        telefone,
        tipodeinstituicaoUnidade_id: tipodeInstituicaoUnidade_id,
      },
      select: {
        id: true,
        name: true,
        endereco: true,
        telefone: true,
        tipodeinstituicaoUnidade_id: true,
      },
    });

    return instituicao;
  }
}

export { CreateInstituicaoUnidadeService };
