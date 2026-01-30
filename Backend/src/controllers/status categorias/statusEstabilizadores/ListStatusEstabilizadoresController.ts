import { Request, Response } from "express";
import { ListEstabilizadoresService } from "../../../services/status_categorias/statusEstabilizadores/ListEstabilizadoresService";
class ListStatusEstabilizadoresController{
    async handle(req: Request, res: Response){
        const liststatusEstabilizadoresService = new ListEstabilizadoresService();

        const status = await liststatusEstabilizadoresService.execute();

        return res.json(status);
    }
}

export {ListStatusEstabilizadoresController}