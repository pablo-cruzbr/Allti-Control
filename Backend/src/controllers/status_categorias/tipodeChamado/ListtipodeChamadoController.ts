import { Response, Request } from "express";
import { ListtipodeChamadoService } from "../../../services/status_categorias/tipodeChamado/ListtipodeChamadoService";

class ListtipodeChamadoController{
    async handle (req: Request, res: Response){
        const listtipodeChamadoService = new ListtipodeChamadoService();

        const status = await listtipodeChamadoService.execute();

        return res.json(status);
    }
}

export {ListtipodeChamadoController}