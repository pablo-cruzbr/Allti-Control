import { Response, Request } from "express";
import { ListReparoService } from "../../../services/status_categorias/statusReparo/ListstatusReparoService";
class ListstatusReparoController{
    async handle (req: Request, res: Response){
        const listReparoService = new ListReparoService();

        const status = await listReparoService.execute();

        return res.json(status)
    }
}

export {ListstatusReparoController}