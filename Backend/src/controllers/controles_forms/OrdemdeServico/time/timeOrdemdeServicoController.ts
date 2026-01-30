import { Request, Response } from "express";
import { TimeOrdemDeServicoService } from "../../../../services/controles_forms/OrdemdeServico/time/timeOrdemdeServicoService";

export const timeOrdemDeServicoController = {
  async iniciar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: "ID da ordem é obrigatório." });

      const ordem = await TimeOrdemDeServicoService.iniciarOrdem(id);
      return res.json(ordem);
    } catch (error: any) {
      console.error("Erro ao iniciar OS:", error.message);
      const status = error.message.includes("não encontrada") ? 404 : 400;
      return res.status(status).json({ error: error.message });
    }
  },

  async concluir(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: "ID da ordem é obrigatório." });

      const ordem = await TimeOrdemDeServicoService.concluirOrdem(id);
      return res.json(ordem);
    } catch (error: any) {
      console.error("Erro ao concluir OS:", error.message);
      const status = error.message.includes("não encontrada") ? 404 : 400;
      return res.status(status).json({ error: error.message });
    }
  },

  async pausar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: "ID da ordem é obrigatório." });

      const ordem = await TimeOrdemDeServicoService.pausarOrdem(id);
      return res.json(ordem);
    } catch (error: any) {
      console.error("Erro ao pausar OS:", error.message);
      const status = error.message.includes("não pode ser pausada") ? 400 : 500;
      return res.status(status).json({ error: error.message });
    }
  },

  async retomar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: "ID da ordem é obrigatório." });

      const ordem = await TimeOrdemDeServicoService.retomarOrdem(id);
      return res.json(ordem);
    } catch (error: any) {
      console.error("Erro ao retomar OS:", error.message);
      const status = error.message.includes("não pode ser retomada") ? 400 : 500;
      return res.status(status).json({ error: error.message });
    }
  },

  async atualizarTempo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { startedAt, endedAt } = req.body;
      if (!id) return res.status(400).json({ error: "ID da ordem é obrigatório." });

      const parsedStartedAt = startedAt ? new Date(startedAt) : undefined;
      const parsedEndedAt = endedAt ? new Date(endedAt) : undefined;

      const ordem = await TimeOrdemDeServicoService.atualizarTempo({
        ordemId: id,
        startedAt: parsedStartedAt,
        endedAt: parsedEndedAt,
      });

      return res.json(ordem);
    } catch (error: any) {
      console.error("Erro ao atualizar tempo:", error.message);
      return res.status(500).json({ error: error.message });
    }
  },

  async lerTempo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: "ID da ordem é obrigatório." });

      const tempo = await TimeOrdemDeServicoService.lerTempo(id);
      return res.json(tempo);
    } catch (error: any) {
      console.error("Erro ao ler tempo:", error.message);
      return res.status(500).json({ error: error.message });
    }
  },
};
