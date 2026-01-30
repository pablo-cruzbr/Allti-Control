import prismaClient from "../../../prisma";

interface ControledeATRequest{
    name: string;
    mesAno: Date;
    idChamado: string;
    assistencia: string;
    observacoes: string;
    osDaAssistencia: string;
    dataDeRetirada: Date;
    equipamento_id: string;
    statusReparo_id: string;
    instituicaoUnidade_id: string;
    tecnico_id: string;
    cliente_id: string;
}

class CreateControledeAssistenciaTecnicaService{
    async execute({
        name, 
        mesAno, 
        idChamado,
        assistencia,
        observacoes,
        osDaAssistencia,
        dataDeRetirada,
        equipamento_id,
        statusReparo_id,
        instituicaoUnidade_id,
        tecnico_id,
        cliente_id,  
    }:  ControledeATRequest){
          if (!name || name.trim() === "") {
      throw new Error("Insira o nome!");
    }

   const controle = await prismaClient.controleDeAssistenciaTecnica.create({
  data: {
    name,
    mesAno,
    idChamado,
    assistencia,
    observacoes,
    osDaAssistencia,
    dataDeRetirada,
    equipamento: { connect: { id: equipamento_id } },
    statusReparo: { connect: { id: statusReparo_id } },
    instituicaoUnidade: { connect: { id: instituicaoUnidade_id } },
    tecnico: { connect: { id: tecnico_id } },
    cliente: { connect: { id: cliente_id } },
  },
 include: {
 equipamento:{
  select: {name: true}
 },
  statusReparo:{
    select: {name: true}
  },
  instituicaoUnidade:{
    select: {name: true}
  },
  tecnico: {
    select: { name: true }
  },
  cliente:{
    select:{name: true}
  }
}

    });
        return controle;
    }
}
  export {CreateControledeAssistenciaTecnicaService};