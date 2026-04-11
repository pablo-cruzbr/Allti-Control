import { Response, Request } from "express";
import { ListtipodeOrdemdeServicoService } from "../../../services/status_categorias/tipodeOrdemdeServico/ListtipodeOrdemdeServicoService";

class ListtipodeOrdemdeServicoController{
    async handle (req: Request, res: Response){
        const listtipodeOrdemdeServicoService = new ListtipodeOrdemdeServicoService();

        const status = await listtipodeOrdemdeServicoService.execute();

        return res.json(status);
    }
}

export {ListtipodeOrdemdeServicoController}