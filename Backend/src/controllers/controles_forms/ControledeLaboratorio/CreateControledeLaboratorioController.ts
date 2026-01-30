import { Response, Request } from "express";
import { CreateControledeLaboratorioService } from "../../../services/controles_forms/ControledeLaboratorio/CreateControledeLaboratorioService";

class CreateControledeLaboratorioController {
  async handle(req: Request, res: Response) {
   
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

      const createControlledeLaboratorioService = new CreateControledeLaboratorioService();

      const controle = await createControlledeLaboratorioService.execute({
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
      });

      return res.json(controle);
  }
}

export { CreateControledeLaboratorioController };
