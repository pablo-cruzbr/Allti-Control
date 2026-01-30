import prismaClient from "../../../prisma";

interface FormTecnicoRequest {
  name: string;
  diagnostico: string;
  solucao: string;
  assinatura: string;

  status_id: string;
  statusOrdemdeServico_id: string;
  ordemDeServico_id: string;  
}

class CreateDocumentacaoTecnicaService{
    async execute({
        name,
  diagnostico,
  solucao,
  assinatura,

  status_id,
  statusOrdemdeServico_id,
  ordemDeServico_id,   
  
    }: FormTecnicoRequest){
        if(!diagnostico || diagnostico.trim() === ""){
            throw new Error("Insira o Diagnóstico da OS !!")
        }

        const formTec = await prismaClient.formTecnico.create({
            data:{
                name,
                diagnostico,
                solucao,
                assinatura,
                status_id,
                statusOrdemdeServico_id,
                ordemDeServico_id,   
            },
            include:{
                statusOrdemdeServico:{
                    select:{
                        name: true
                    }
                },
                ordemDeServico:{
                    select:{
                        name: true
                    }
                }

            }
        })
        return formTec;
    }
}

export {CreateDocumentacaoTecnicaService}