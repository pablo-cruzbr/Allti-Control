import prismaClient from "../../../../prisma";

class ListInformacoesSetorService {
    async execute(){
        const setores = await prismaClient.informacoesSetor.findMany({
             orderBy: {
                created_at: "desc", 
                
            },
           select: {
                id: true,
                usuario: true,
                ramal: true,
                andar: true,
                setor: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                cliente: {
                    select: {
                        id: true,
                        name: true,
                        endereco: true,
                        cnpj: true
                    }
                },
                instituicaoUnidade: {
                    select:{
                        name: true,
                        endereco: true
                    }
                },
            },
        })
        return setores;
    }
}

export { ListInformacoesSetorService}