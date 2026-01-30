import prismaClient from "../../../prisma";
interface ControledeLaboratorioRequest {
  nomedoEquipamento: string;
  defeito: string;
  marca: string;
  osDeAbertura: string;
  osDeDevolucao: string;
  data_de_Chegada: Date;
  data_de_Finalizacao: Date;

  instituicaoUnidade_id: string;
  cliente_id: string;
  equipamento_id: string;
  statusControledeLaboratorio_id: string;
}

class CreateControledeLaboratorioService {
  async execute({
    nomedoEquipamento,
    defeito,
    marca,
    osDeAbertura,
    osDeDevolucao,
    data_de_Chegada,
    data_de_Finalizacao,
    instituicaoUnidade_id,
    cliente_id,
    equipamento_id,
    statusControledeLaboratorio_id,
  }: ControledeLaboratorioRequest) {
    if (!nomedoEquipamento || nomedoEquipamento.trim() === "") {
      throw new Error("Insira o nome!");
    }

    const controle = await prismaClient.controleDeLaboratorio.create({
      data: {
        nomedoEquipamento,
        defeito,
        marca,
        osDeAbertura,
        osDeDevolucao,
        data_de_Chegada,
        data_de_Finalizacao,

        statusControledeLaboratorio: {
          connect: { id: statusControledeLaboratorio_id },
        },
        equipamento: {
          connect: { id: equipamento_id },
        },
        cliente: {
          connect: { id: cliente_id },
        },
         instituicaoUnidade: { connect: { id: instituicaoUnidade_id } },
      },
      include: {
        equipamento: {
          select: { 
            name: true,
            patrimonio: true },
        },
        cliente: {
          select: { name: true },
        },
         instituicaoUnidade:{
            select: {
              name: true,
              endereco: true}
        },
        statusControledeLaboratorio: {
          select: { name: true },
        },
      },
    });

    return controle;
  }
}

export { CreateControledeLaboratorioService };
