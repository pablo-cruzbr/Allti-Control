import { Response, Request } from "express";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import prismaClient from "../../../prisma";
import { UploadedFile } from "express-fileupload";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

type UpdateOrdemdeServicoRequest = {
  prioridade_id?: string;
  equipamento_id?: string;
  tecnico_id?: string;
  tarefa_id?: string;
  statusOrdemdeServico_id?: string;
  tipodeChamado_id?: string;
  tipodeOrdemdeServico_id?: string;
  informacoesSetor_id?: string;
  instituicaoUnidade_id?: string;
  cliente_id?: string; 
  nameTecnico?: string;
  diagnostico?: string;
  solucao?: string;
  assinante?: string; 
  descricaodoProblemaouSolicitacao?: string;
  assinatura?: string; 
  atividades_ids?: string[]; 
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
        tarefa_id,
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
        assinatura, 
        atividades_ids,
        startedAt,
        endedAt,
        duracao,
        assinante
      } = req.body as UpdateOrdemdeServicoRequest;

      let bannerassinatura: string | undefined;

      if (assinatura && assinatura.startsWith('data:image')) {
        const uploadResponse = await cloudinary.uploader.upload(assinatura, {
          folder: "signatures_os",
        });
        bannerassinatura = uploadResponse.secure_url;
      } else if ((req.files as any)?.file) {
        const file = (req.files as any).file as UploadedFile;
        const result: UploadApiResponse = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "ordens",
        });
        bannerassinatura = result.secure_url;
      }

      // 2. Update no Prisma
      const updatedRecord = await prismaClient.ordemdeServico.update({
        where: { id },
        data: {
          ...(solucao && { solucao }),
          ...(assinante && { assinante }),
          ...(nameTecnico && { nameTecnico }),
          ...(diagnostico && { diagnostico }),
          ...(bannerassinatura && { bannerassinatura }),
          ...(descricaodoProblemaouSolicitacao?.trim() && { descricaodoProblemaouSolicitacao }),
          ...(startedAt && { startedAt: new Date(startedAt) }),
          ...(endedAt && { endedAt: new Date(endedAt) }),
          ...(duracao && { duracao: Number(duracao) }),

          ...(atividades_ids && {
            atividades: {
              deleteMany: {}, 
              create: atividades_ids.map(atvId => ({
                atividadePadraoId: atvId
              }))
            }
          }),

          ...(equipamento_id && { equipamento: { connect: { id: equipamento_id } } }),
          ...(prioridade_id && { prioridade: { connect: { id: prioridade_id } } }),
          ...(tarefa_id && { tarefa: { connect: { id: tarefa_id } } }),
          ...(tecnico_id && { tecnico: { connect: { id: tecnico_id } } }),
          ...(statusOrdemdeServico_id && { statusOrdemdeServico: { connect: { id: statusOrdemdeServico_id } } }),
          ...(tipodeChamado_id && { tipodeChamado: { connect: { id: tipodeChamado_id } } }),
          ...(tipodeOrdemdeServico_id && { tipodeOrdemdeServico: { connect: { id: tipodeOrdemdeServico_id } } }),
          ...(informacoesSetor_id && { informacoesSetor: { connect: { id: informacoesSetor_id } } }),
  
          instituicaoUnidade: instituicaoUnidade_id 
            ? { connect: { id: instituicaoUnidade_id } } 
            : undefined,
          cliente: cliente_id 
            ? { connect: { id: cliente_id } } 
            : undefined,
        },
        include: {
          atividades: {
            include: { atividadePadrao: true }
          },
          statusOrdemdeServico: true,
          tecnico: true
        }
      });

      return res.json({
        message: "Ordem de Serviço atualizada com sucesso.",
        ordem: updatedRecord,
      });

    } catch (error: any) {
      console.error("ERRO NO UPDATE SERVICE:", error);
      return res.status(400).json({ error: error.message || "Erro interno ao atualizar ordem." });
    }
  }
}

export { UpdateOrdemdeServicoService };