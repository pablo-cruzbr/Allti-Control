import prismaClient from "../../../../prisma";

interface InformacoesRequest {
  setorId: string;
  usuario: string;
  andar: string;
  ramal: string;
  clienteId?: string | null;
  instituicaoUnidadeId?: string | null;
}

class CreateInformacoesSetorService {
  async execute({
    setorId,
    usuario,
    andar,
    ramal,
    clienteId,
    instituicaoUnidadeId,
  }: InformacoesRequest) {
   
    let validClienteId: string | null = null;
    if (clienteId) {
      const cliente = await prismaClient.cliente.findUnique({ where: { id: clienteId } });
      if (cliente) {
        validClienteId = cliente.id;
      } else {
        console.warn(`Cliente com id ${clienteId} não encontrado. Será usado null.`);
      }
    }

  
    let validInstituicaoId: string | null = null;
    if (instituicaoUnidadeId) {
      const instituicao = await prismaClient.instituicaoUnidade.findUnique({ where: { id: instituicaoUnidadeId } });
      if (instituicao) {
        validInstituicaoId = instituicao.id;
      } else {
        console.warn(`Instituição/Unidade com id ${instituicaoUnidadeId} não encontrada. Será usado null.`);
      }
    }

    const info = await prismaClient.informacoesSetor.create({
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
  }
}

export { CreateInformacoesSetorService };
