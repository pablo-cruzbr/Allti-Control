import { Response, Request } from "express";
import { ListTecnicoService } from "../../../services/status_categorias/tecnico/ListTecnicoService";

class ListTecnicoController {
  async handle(req: Request, res: Response) {
    const listTecnicoService = new ListTecnicoService();

    const { controles, total } = await listTecnicoService.execute();

    return res.json({ controles, total }); 
  }
}

export { ListTecnicoController };
