import { Request, Response } from "express";
import { DeleteControledeMaquinasPendentesOroService } from "../../../services/controles_forms/ControledeMaquinasPendentesOro/DeleteControledeMaquinasPendentesOroService";
class DeleteControledeMaquinasPendentesOroController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const service = new  DeleteControledeMaquinasPendentesOroService ();
      await service.execute({ id });
      
      return res.json({ message: "Registro deletado com sucesso!" });
      
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { DeleteControledeMaquinasPendentesOroController };
