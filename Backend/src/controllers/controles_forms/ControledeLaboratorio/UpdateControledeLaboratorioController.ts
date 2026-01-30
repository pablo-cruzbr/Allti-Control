import { Request, Response } from "express";
import { UpdateControledeLaboratorioService, UpdateAssistenciaTecnicaRequest } from "../../../services/controles_forms/ControledeLaboratorio/UpdateControledeLaboratorioService";
class UpdateControledeLaboratorioController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    // Desestrutura os dados do body
    const {
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
    } = req.body;

    // Monta o objeto do tipo UpdateAssistenciaTecnicaRequest
    const data: UpdateAssistenciaTecnicaRequest = {
        id,
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
    };

    try {
      const service = new UpdateControledeLaboratorioService();
      const result = await service.execute(data);
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { UpdateControledeLaboratorioController };
