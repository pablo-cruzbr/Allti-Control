import { Request, Response } from "express";
import { ListControledeAssistenciaTecnicaService } from "../../../services/controles_forms/ControledeAssistenciaTecnica/ListControledeAssistenciaTecnicaService";

class ListControledeAssistenciaTecnicaController {
  async handle(req: Request, res: Response) {
    const service = new ListControledeAssistenciaTecnicaService();
    const { controles, total, totalAguardandoReparo, totalFinalizado } = await service.execute();

    return res.json({
      controles,
      total,
      totalAguardandoReparo,
      totalFinalizado,
    });
  }
}

export { ListControledeAssistenciaTecnicaController };
