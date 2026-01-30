import { Request, Response } from "express";
import { DeleteControledeLaboratorioService } from "../../../services/controles_forms/ControledeLaboratorio/DeleteControledeLaboratorioService";

class DeleteControledeLaboratorioController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const service = new DeleteControledeLaboratorioService();
      await service.execute({ id });
      
      return res.json({ message: "Registro deletado com sucesso!" });
      
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { DeleteControledeLaboratorioController };
