import { Request, Response } from "express";
import { UpdateAssistenciaTecnicaRequest, UpdateAssistenciaTecnicaService } from "../../../services/controles_forms/ControledeAssistenciaTecnica/UpdateAssistenciaTecnicaService";
class UpdateAssistenciaTecnicaController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    // Desestrutura os dados do body
    const {
        name,
        mesAno, 
        idChamado,
        assistencia,
        observacoes,
        osDaAssistencia,
        dataDeRetirada,
        cliente_id,
        tecnico_id,
        instituicaoUnidade_id,
        equipamento_id,
        statusReparo_id
    } = req.body;

    // Monta o objeto do tipo UpdateAssistenciaTecnicaRequest
    const data: UpdateAssistenciaTecnicaRequest = {
        id, 
        name,
        mesAno, 
        idChamado,
        assistencia,
        observacoes,
        osDaAssistencia,
        dataDeRetirada,
        cliente_id,
        tecnico_id,
        instituicaoUnidade_id,
        equipamento_id,
        statusReparo_id
    };

    try {
      const service = new UpdateAssistenciaTecnicaService();
      const result = await service.execute(data);
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { UpdateAssistenciaTecnicaController };
