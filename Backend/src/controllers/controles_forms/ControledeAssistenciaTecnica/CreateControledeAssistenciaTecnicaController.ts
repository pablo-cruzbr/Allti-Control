import { Response, Request } from "express";
import {CreateControledeAssistenciaTecnicaService } from "../../../services/controles_forms/ControledeAssistenciaTecnica/CreateControledeAssistenciaTecnicaService";

class CreateControledeAssistenciaTecnicaController {
  async handle(req: Request, res: Response) {
   
      const {
        name, 
        mesAno, 
        idChamado,
        assistencia,
        observacoes,
        osDaAssistencia,
        dataDeRetirada,
        equipamento_id,
        statusReparo_id,
        instituicaoUnidade_id,
        tecnico_id,
        cliente_id,
      } = req.body;

      const createControledeAssistenciaTecnicaService = new CreateControledeAssistenciaTecnicaService();

      const controle = await createControledeAssistenciaTecnicaService.execute({
        name,
        mesAno,
        idChamado,
        assistencia,
        observacoes,
        osDaAssistencia,
        dataDeRetirada,
        equipamento_id,
        statusReparo_id,
        instituicaoUnidade_id,
        tecnico_id,
        cliente_id,
      });

      return res.json(controle);
  }
}

export { CreateControledeAssistenciaTecnicaController };
