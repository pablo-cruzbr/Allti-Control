import { Request, Response } from "express";
import prismaClient from "../../../prisma";

interface CreateOrdemServicoRequest {
  name: string;
  descricaodoProblemaouSolicitacao: string;
  nomedoContatoaserProcuradonoLocal?: string;
  cliente_id?: string;
  tipodeChamado_id: string;
  instituicaoUnidade_id?: string;
  tecnico_id?: string;
  user_id: string;
  nameTecnico?: string;
  diagnostico?: string;
  solucao?: string;
  bannerassinatura?: string;
  informacoesSetorId?: string;
}

class CreateOrdemServicoService {
  async execute(data: CreateOrdemServicoRequest) {
    

    const statusAbertaId = "80e14fbe-c7fd-45bc-b3cd-cfa51ede44e0";

    // Gera número aleatório de 5 dígitos
    const numeroOS = Math.floor(10000 + Math.random() * 90000);

    const ordem = await prismaClient.ordemdeServico.create({
      data: {
        numeroOS,
        name: data.name || "Sem nome",
        descricaodoProblemaouSolicitacao: data.descricaodoProblemaouSolicitacao,
        nomedoContatoaserProcuradonoLocal: data.nomedoContatoaserProcuradonoLocal || null,
        tipodeChamado: { connect: { id: data.tipodeChamado_id } },
        user: { connect: { id: data.user_id } },
        statusOrdemdeServico: { connect: { id: statusAbertaId } },
        cliente: data.cliente_id ? { connect: { id: data.cliente_id } } : undefined,
        instituicaoUnidade: data.instituicaoUnidade_id ? { connect: { id: data.instituicaoUnidade_id } } : undefined,
        tecnico: data.tecnico_id ? { connect: { id: data.tecnico_id } } : undefined,
        nameTecnico: data.nameTecnico || null,
        diagnostico: data.diagnostico || null,
        solucao: data.solucao,
        bannerassinatura: data.bannerassinatura || null,
        informacoesSetor: data.informacoesSetorId
          ? { connect: { id: data.informacoesSetorId } }
          : undefined,
      },
      include: {
        cliente: true,
        tecnico: true,
        tipodeChamado: true,
        statusOrdemdeServico: true,
        instituicaoUnidade: true,
        user: true,
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
          },
        },
      },
    });

    return ordem;
  }
}

class CreateOrdemServicoController {
  async handle(req: Request, res: Response) {
    const {
      name,
      descricaodoProblemaouSolicitacao,
      nomedoContatoaserProcuradonoLocal,
      cliente_id,
      tipodeChamado_id,
      instituicaoUnidade_id,
      tecnico_id,
      user_id,
      nameTecnico,
      diagnostico,
      solucao,
      bannerassinatura,
      informacoesSetorId,
    } = req.body;

    const service = new CreateOrdemServicoService();

    try {
      const ordem = await service.execute({
        name,
        descricaodoProblemaouSolicitacao,
        nomedoContatoaserProcuradonoLocal,
        cliente_id,
        tipodeChamado_id,
        instituicaoUnidade_id,
        tecnico_id,
        user_id,
        nameTecnico,
        diagnostico,
        solucao,
        bannerassinatura,
        informacoesSetorId,
      });

      return res.json(ordem);
    } catch (error: any) {
      console.error("Erro ao criar ordem:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

export { CreateOrdemServicoController };
