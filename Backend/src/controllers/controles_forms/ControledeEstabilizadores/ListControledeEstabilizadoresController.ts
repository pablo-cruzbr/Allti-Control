import { Request, Response } from "express";
import { ListControledeEstabilizadoresService } from "../../../services/controles_forms/ControledeEstabilizadores/ListControledeEstabilizadoresService";

class ListControledeEstabilizadoresController {
  async handle(req: Request, res: Response) {
    const service = new ListControledeEstabilizadoresService();
    const { controles, total, totalAguardandoReparo, totalFinalizado } = await service.execute();

    return res.json({
      controles,
      total,
      totalAguardandoReparo,
      totalFinalizado,
    });
  }
}

export { ListControledeEstabilizadoresController };
