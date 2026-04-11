import { Response, Request } from "express";
import { ListClienteService } from "../../../services/status_categorias/Cliente/ListClienteService";

class ListClienteController {
  async handle(req: Request, res: Response) {
    const service = new ListClienteService();
    const { cliente, total } = await service.execute();

    return res.json({
      controles: cliente, 
      total,
    });
  }
}


export {ListClienteController}