import { Response, Request } from "express";
import { CreateControledeEstabilizadoresService } from "../../../services/controles_forms/ControledeEstabilizadores/CreateControledeEstabilizadoresService";

class CreateControledeEstabilizadoresController {
  async handle(req: Request, res: Response) {
    try {
      const {
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

      const createControleService = new CreateControledeEstabilizadoresService();

      const controle = await createControleService.execute({
        idChamado,
        problema,
        observacoes,
        osdaAssistencia,
        datadeChegada: datadeChegada
          ? new Date(datadeChegada).toISOString()
          : "", 
        datadeRetirada: datadeRetirada
          ? new Date(datadeRetirada).toISOString()
          : "", 
        estabilizadores_id,
        statusEstabilizadores_id,
        instituicaoUnidade_id,
        name: problema,
      });

      return res.json(controle);
    } catch (error: any) {
      console.error("Erro ao criar Controle de Estabilizadores:", error);
      return res.status(400).json({ error: error.message });
    }
  }
}

export { CreateControledeEstabilizadoresController };
