import { Request, Response } from "express";
import { CreateStatusComprasService } from "../../../services/status_categorias/statusCompras/CreateStatusComprasService";

class CreateStatusComprasController {
    async handle(req: Request, res:Response){
        const {name} = req.body;
        const createStatusComprasService = new CreateStatusComprasService();

        const status = await createStatusComprasService.execute(name);

        return res.json(status);
    }
}

export {CreateStatusComprasController}