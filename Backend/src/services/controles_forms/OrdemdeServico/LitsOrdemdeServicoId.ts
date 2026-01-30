import prismaClient from "../../../prisma";

interface GetOSRequest {
    id: string;
}

class ListOrdemdeServicoId {
    async execute({ id }: GetOSRequest) { // Recebe um objeto com o ID

        // Busca uma única Ordem de Serviço pelo ID
        const ordem = await prismaClient.ordemdeServico.findUnique({
            where: {
                id: id, 
            },
            select: {
                id: true,
                numeroOS: true,
                name: true,
                descricaodoProblemaouSolicitacao: true,
                nomedoContatoaserProcuradonoLocal: true,
                created_at: true,
                updatedAt: true,
                nameTecnico: true,
                diagnostico: true,
                solucao: true,
                assinante: true,
                equipamento: {
                    select: {
                        id: true,
                        name: true,
                        patrimonio: true,
                    }
                },
                statusOrdemdeServico: {
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
                informacoesSetor: {
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
                        instituicaoUnidade: {
                            select: {
                                id: true,
                                name: true,
                                endereco: true,
                            }
                        },
                        cliente: {
                            select: {
                                id: true,
                                name: true,
                                endereco: true,
                                cnpj: true
                            }
                        }
                    }
                },
                cliente: {
                    select: {
                        id: true,
                        name: true,
                        endereco: true,
                    },
                },
                tecnico: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                tipodeChamado: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return ordem; // Retorna o objeto da OS ou null se não for encontrado
    }
}

export { ListOrdemdeServicoId };