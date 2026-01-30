import { Request, Response } from "express";
import { DeleteControledeMaquinasPendentesLabService } from "../../../services/controles_forms/ControledeMaquinasPendentesLab/DeleteControledeMaquinasPendentesLabService";

class DeleteControledeMaquinasPendentesLabController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const service = new  DeleteControledeMaquinasPendentesLabService ();
      await service.execute({ id });
      
      return res.json({ message: "Registro deletado com sucesso!" });
      
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { DeleteControledeMaquinasPendentesLabController };
