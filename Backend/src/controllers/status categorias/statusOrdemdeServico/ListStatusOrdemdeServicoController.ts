import { Response, Request } from "express";
import { ListStatusOrdemdeServicoService } from "../../../services/status_categorias/statusOrdemdeServico/ListStatusOrdemdeServicoService";

class ListStatusOrdemdeServicoController{
    async handle(req: Request, res: Response){
        const listStatusOrdemdeServicoService = new ListStatusOrdemdeServicoService();

        const status = await listStatusOrdemdeServicoService.execute();

        return res.json(status);
    }
}

export {ListStatusOrdemdeServicoController}