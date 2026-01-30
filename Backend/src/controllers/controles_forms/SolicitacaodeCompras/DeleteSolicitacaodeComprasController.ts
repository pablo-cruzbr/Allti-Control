import { Request, Response } from "express";
import { DeleteSolicitacaodeComprasService } from "../../../services/controles_forms/SolicitacaodeCompras/DeleteSolicitacaodeComprasService";
class DeleteSolicitacaodeComprasController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const service = new  DeleteSolicitacaodeComprasService ();
      await service.execute({ id });
      
      return res.json({ message: "Registro deletado com sucesso!" });
      
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { DeleteSolicitacaodeComprasController };
