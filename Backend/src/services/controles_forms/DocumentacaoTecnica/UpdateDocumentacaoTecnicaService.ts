import prismaClient from "../../../prisma";

export interface UpdateDocumentacaoTecnicaRequest {
  id: string;
  titulo: string;
  descricao: string;
 
 
  cliente_id: string;
  tecnico_id: string;
  instituicaoUnidade_id: string
}

class UpdateDocumentacaoTecnicaService {
  async execute({ 
    id, 
    titulo,
    descricao, 
    cliente_id,
    tecnico_id,
    instituicaoUnidade_id

    }: UpdateDocumentacaoTecnicaRequest  ) {
    if (!id) {
      throw new Error("ID obrigatório para deletar a Solicitacao de Compras.");
    }

    // Verifica se o registro existe antes de atualizar
    const controle = await prismaClient.documentacaoTecnica.findUnique({
      where: { id },
    });

    if (!controle) {
      throw new Error("Controle de Solicitacao de Compras não encontrada.");
    }

    await prismaClient.documentacaoTecnica.update({
      where: { id },
      data:{
        titulo,
        descricao,
        
        cliente_id,
        tecnico_id,
        instituicaoUnidade_id
      },
    });

     const status = await prismaClient.documentacaoTecnica.findUnique({
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
        
      }
    });

    return { message: "Controle de Documentação Técnica Atualizado com sucesso.", controle, status};
  }
}

export {UpdateDocumentacaoTecnicaService };
