import prismaClient from "../../../prisma";

interface ControledeLTRequest{
    descricaodoProblema: string;
    mesAno: string | Date;
    osLab: string;

    instituicaoUnidade_id: string;
    tecnico_id: string;
    equipamento_id: string;
}

class CreateControledeLaudoTecnicoService{
    async execute({
        descricaodoProblema,mesAno, osLab, instituicaoUnidade_id, tecnico_id, equipamento_id
    }: ControledeLTRequest){
         if (!descricaodoProblema || descricaodoProblema.trim() === "") {
      throw new Error("Insira a descrição do Problema!");
    }

const controle = await prismaClient.controleDeLaudoTecnico.create({
  data: {
    descricaodoProblema,
    mesAno: new Date(mesAno),
    osLab,
    instituicaoUnidade_id,
    equipamento_id,
    tecnico_id,
  },
  include: {
    equipamento: {
      select: { 
        name: true,
      patrimonio: true, }
    },
    tecnico: {
      select: { name: true }
    },
    instituicaoUnidade: {
      select: { name: true }
    }
  }
});
        return controle;
    }
}

export {CreateControledeLaudoTecnicoService}
