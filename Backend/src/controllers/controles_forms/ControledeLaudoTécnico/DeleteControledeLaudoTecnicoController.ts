import { Request, Response } from "express";
import { DeleteControledeLaudoTecnicoService } from "../../../services/controles_forms/ControledeLaudoTécnico/DeleteControledeLaudoTenicoService";
class DeleteControledeLaudoTecnicoController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const service = new DeleteControledeLaudoTecnicoService();
      await service.execute({ id });
      
      return res.json({ message: "Registro deletado com sucesso!" });
      
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { DeleteControledeLaudoTecnicoController };
