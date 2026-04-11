import { Response, Request } from "express";
import {ListSetoresService } from "../../../services/status_categorias/Setor/ListSetoresService";

class ListSetoresController {
    async handle (req: Request, res: Response){
        const listSetoresService = new ListSetoresService();

        const setor = await listSetoresService.execute();

        return res.json(setor)
    }
}

export {ListSetoresController}