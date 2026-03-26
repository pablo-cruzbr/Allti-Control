import prismaClient from "../../../../prisma";

interface InformacoesRequest {
  id: string; 
  setorId: string;
  usuario: string;
  andar: string;
  ramal: string;
  clienteId?: string | null;
  instituicaoUnidadeId?: string | null;
}

class UpdateInformacoesSetorService {
  async execute({
    id,
    setorId,
    usuario,
    andar,
    ramal,
    clienteId,
    instituicaoUnidadeId,
  }: InformacoesRequest) {
    
    if (!id) {
      throw new Error("ID das informações do setor é obrigatório para atualização.");
    }

    let validClienteId: string | null = null;
    if (clienteId) {
      const cliente = await prismaClient.cliente.findUnique({ where: { id: clienteId } });
      if (cliente) {
        validClienteId = cliente.id;
      }
    }

    let validInstituicaoId: string | null = null;
    if (instituicaoUnidadeId) {
      const instituicao = await prismaClient.instituicaoUnidade.findUnique({ where: { id: instituicaoUnidadeId } });
      if (instituicao) {
        validInstituicaoId = instituicao.id;
      }
    }

    try {
      const info = await prismaClient.informacoesSetor.update({
        where: {
          id: id, 
        },
        data: {
          setorId,
          usuario,
          andar,
          ramal,
          cliente_id: validClienteId,
          instituicaoUnidade_id: validInstituicaoId,
        },
        select: {
          id: true,
          usuario: true,
          andar: true,
          ramal: true,
          setor: {
            select: {
              id: true,
              name: true,
            },
          },
          instituicaoUnidade: {
            select: {
              id: true,
              name: true,
              endereco: true,
            },
          },
          cliente: {
            select: {
              id: true,
              name: true,
              cnpj: true,
              endereco: true,
            },
          },
        },
      });

      return info;
    } catch (error) {
      throw new Error("Erro ao atualizar informações do setor: Registro não encontrado.");
    }
  }
}

export { UpdateInformacoesSetorService };