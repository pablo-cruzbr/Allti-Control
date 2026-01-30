import { Request, Response } from "express";
import { ListControledeLaudoTecnicoService } from "../../../services/controles_forms/ControledeLaudoTécnico/ListControledeLaudoTecnicoService";

class ListControledeLaudoTecnicoController {
  async handle(req: Request, res: Response) {
    const service = new ListControledeLaudoTecnicoService();
    const result = await service.execute();
    return res.json(result);
  }
}

export { ListControledeLaudoTecnicoController };
