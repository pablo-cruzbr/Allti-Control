import prismaClient from "../../../prisma";

interface ControledeEstabilizadoresRequest {
  name: string;
  idChamado: string;
  problema: string;
  observacoes: string;
  osdaAssistencia: string;
  datadeChegada: string; // string
  datadeRetirada: string; // string
  estabilizadores_id: string;
  statusEstabilizadores_id: string;
  instituicaoUnidade_id?: string;
}

class CreateControledeEstabilizadoresService {
  async execute({
    name,
    idChamado,
    problema,
    observacoes,
    osdaAssistencia,
    datadeChegada,
    datadeRetirada,
    estabilizadores_id,
    statusEstabilizadores_id,
    instituicaoUnidade_id,
  }: ControledeEstabilizadoresRequest) {
    if (!name || name.trim() === "") {
      throw new Error("Insira o nome!");
    }

    const controle = await prismaClient.controledeEstabilizadores.create({
      data: {
        idChamado,
        problema,
        observacoes,
        osdaAssistencia,
        datadeChegada, // já é string
        datadeRetirada, // já é string
        estabilizadores: { connect: { id: estabilizadores_id } },
        statusEstabilizadores: { connect: { id: statusEstabilizadores_id } },
        instituicaoUnidade: instituicaoUnidade_id
          ? { connect: { id: instituicaoUnidade_id } }
          : undefined,
      },
      include: {
        estabilizadores: { select: { name: true, patrimonio: true } },
        statusEstabilizadores: { select: { name: true } },
        instituicaoUnidade: { select: { name: true, endereco: true } },
      },
    });

    return controle;
  }
}

export { CreateControledeEstabilizadoresService };
