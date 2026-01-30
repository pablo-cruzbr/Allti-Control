import { Request, Response } from "express";
import { DeleteDocumentacaoTecnicaService } from "../../../services/controles_forms/DocumentacaoTecnica/DeleteDocumentacaoTecnicaService";
class DeleteDocumentacaoTecnicaController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const service = new  DeleteDocumentacaoTecnicaService ();
      await service.execute({ id });
      
      return res.json({ message: "Registro deletado com sucesso!" });
      
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { DeleteDocumentacaoTecnicaController };
