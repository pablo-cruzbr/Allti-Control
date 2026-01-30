import { Request, Response } from "express";
import { ListControledeLaboratorioService } from "../../../services/controles_forms/ControledeLaboratorio/ListControledeLaboratorioService";

class ListControledeLaboratorioController {
  async handle(req: Request, res: Response) {
    const service = new ListControledeLaboratorioService();
    const {controles, total, totalAguardandoConserto, totalAguardandoDevolucao, totalAguardandoOSdeLaboratorio} = await service.execute();
    const result = await service.execute();
    
    return res.json({
      result,
      controles,
      total,
      totalAguardandoConserto,
      totalAguardandoDevolucao,
      totalAguardandoOSdeLaboratorio,
    });
  }
}

export { ListControledeLaboratorioController };
