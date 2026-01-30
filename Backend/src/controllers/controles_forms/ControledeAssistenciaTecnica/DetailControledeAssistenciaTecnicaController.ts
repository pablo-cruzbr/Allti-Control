import { Response, Request } from "express";
import { DetailAssistenciaTecnicaService } from "../../../services/controles_forms/ControledeAssistenciaTecnica/DetailControledeAssistenciaTecnicaService";

class DetailAssistenciaTecnicaController {
  async handle(req: Request, res: Response) {
    const controle_id = req.query.controle_id as string;

    const detailAssistenciaTecnicaService = new DetailAssistenciaTecnicaService();

    const controle = await detailAssistenciaTecnicaService.execute({
      controle_id,
    });

    return res.json(controle);
  }
}

export { DetailAssistenciaTecnicaController };
