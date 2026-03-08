import { Response, Request } from "express";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import prismaClient from "../../../prisma";
import { UploadedFile } from "express-fileupload";

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Tipagem do corpo da requisição
type UpdateOrdemdeServicoRequest = {
  prioridade_id: string;
  equipamento_id: string;
  tecnico_id?: string;
  statusOrdemdeServico_id?: string;
  tipodeChamado_id?: string;
  tipodeOrdemdeServico_id: string;
  informacoesSetor_id?: string;
  instituicaoUnidade_id?: string;
  cliente_id?: string; 
  nameTecnico?: string;
  diagnostico?: string;
  solucao?: string;
  assinante?: string; 
  descricaodoProblemaouSolicitacao?: string;
  bannerassinatura?: string;
  assinaturaDigital?: string;
  startedAt?: Date | string;
  endedAt?: Date | string;
  duracao?: number;
};

class UpdateOrdemdeServicoService {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "ID da ordem é obrigatório." });
      }

      const {
        prioridade_id,
        tecnico_id,
        statusOrdemdeServico_id,
        equipamento_id,
        tipodeChamado_id,
        tipodeOrdemdeServico_id,
        informacoesSetor_id,
        instituicaoUnidade_id,
        cliente_id,
        nameTecnico,
        diagnostico,
        solucao,
        descricaodoProblemaouSolicitacao,
        assinaturaDigital,
        startedAt,
        endedAt,
        duracao,
        assinante
      } = req.body as UpdateOrdemdeServicoRequest;

      let bannerassinatura: string | undefined;

      if ((req.files as any)?.file) {
  const file = (req.files as any).file as UploadedFile;
  const result: UploadApiResponse = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: "ordens",
  });

  bannerassinatura = result.secure_url;
}

      const updatedRecord = await prismaClient.ordemdeServico.update({
        where: { id },
        data: {
          ...(solucao && { solucao }),
          ...(assinante && {assinante}),
          ...(descricaodoProblemaouSolicitacao?.trim() && { descricaodoProblemaouSolicitacao }),
          ...(nameTecnico && { nameTecnico }),
          ...(diagnostico && { diagnostico }),
          ...(bannerassinatura && { bannerassinatura }),
          ...(assinaturaDigital && { assinaturaDigital }),
          ...(startedAt && { startedAt: new Date(startedAt) }),
          ...(endedAt && { endedAt: new Date(endedAt) }),
          ...(duracao && { duracao }),
         

          // Relacionamentos opcionais
           ...(equipamento_id && {equipamento: {connect: {id: equipamento_id}}}),
           ...(prioridade_id && {prioridade: {connect: {id:  prioridade_id}}}),
          ...(tecnico_id && { tecnico: { connect: { id: tecnico_id } } }),
          ...(statusOrdemdeServico_id && { statusOrdemdeServico: { connect: { id: statusOrdemdeServico_id } } }),
          ...(tipodeChamado_id && { tipodeChamado: { connect: { id: tipodeChamado_id } } }),
          ...(tipodeOrdemdeServico_id && {tipodeOrdemdeServico: {connect: {id: tipodeOrdemdeServico_id} } }),
          ...(informacoesSetor_id && { informacoesSetor: { connect: { id: informacoesSetor_id } } }),
         instituicaoUnidade: instituicaoUnidade_id
          ? { connect: { id: instituicaoUnidade_id } }
          : { disconnect: true },  

        cliente: cliente_id
          ? { connect: { id: cliente_id } }
          : { disconnect: true },  

        },
        select: {
          id: true,
          solucao: true,
          assinante: true,
          descricaodoProblemaouSolicitacao: true,
          tipodeChamado: { select: { id: true, name: true } },
          tipodeOrdemdeServico: {select: {id: true, name: true}},
          statusOrdemdeServico: { select: { id: true, name: true } },
          informacoesSetor: {
            select: {
              id: true,
              usuario: true,
              ramal: true,
              andar: true,
              setor: { select: { id: true, name: true } },
            },
          },
          equipamento: {select: {id: true, name: true, patrimonio: true}},
          prioridade: {select: {id: true, name: true}},
          instituicaoUnidade: { select: { id: true, name: true } },
          cliente: { select: { id: true, name: true } },
          nameTecnico: true,
          diagnostico: true,
          bannerassinatura: true,
          assinaturaDigital: true,
          startedAt: true,
          endedAt: true,
          duracao: true,
        },
      });

      return res.json({
        message: "Ordem de Serviço atualizada com sucesso.",
        ordem: updatedRecord,
      });
    } catch (error: any) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }
  }
}

export { UpdateOrdemdeServicoService };
