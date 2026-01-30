import { Request, Response } from "express";
import { UpdateControledeEstabilizadoresService } from "../../../services/controles_forms/ControledeEstabilizadores/UpdateControledeEstabilizadoresService";

class UpdateControledeEstabilizadoresController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const {
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
    } = req.body;

    try {
      const service = new UpdateControledeEstabilizadoresService();
      const result = await service.execute({
        id,
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
      });
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { UpdateControledeEstabilizadoresController };
