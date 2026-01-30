import prismaClient from "../../../prisma";

interface DocumentacaoTecnicaRequest {
    id: string;
    titulo: string;
    descricao: string;
    
    cliente_id: string;
    tecnico_id: string;
    instituicaoUnidade_id: string
}

class CreateDocumentacaoTecnicaService{
    async execute({
        id,
        titulo,
        descricao,
        cliente_id,
        tecnico_id,
        instituicaoUnidade_id,
    }: DocumentacaoTecnicaRequest){
        if (!titulo || titulo.trim() === ""){
            throw new Error ("Insira um titulo para sua documentação!")
        }

      const controle = await prismaClient.documentacaoTecnica.create({
        data:{
            id,
            titulo,
            descricao,
            cliente_id,
            tecnico_id,
            instituicaoUnidade_id,
        },
        include:{
            tecnico:{
                select:{
                    name: true
                }
            },
            cliente:{
                select:{
                    name: true
                }
            },
            instituicaoUnidade:{
                select:{
                    name: true
                }
            }
        }
      }) 
      return controle; 
    }
}

export {CreateDocumentacaoTecnicaService}