import { Request, Response } from "express";
import { ListStatusComprasService } from "../../../services/status_categorias/statusCompras/ListStatusComprasService";

class ListStatusComprasController{
    async handle (req: Request, res:Response){
        const listStatusComprasService = new ListStatusComprasService();

        const status = await listStatusComprasService.execute();

        return res.json(status)
    }
}

export {ListStatusComprasController}