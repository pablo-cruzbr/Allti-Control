import { Response, Request } from "express";
import { CreateStatusEstabilizadoresService } from "../../../services/status_categorias/statusEstabilizadores/CreateStatusEstabilizadoresService";
class CreateStatusEstabilizadoresController{
    async handle(req: Request, res: Response){
        const {name} = req.body;
        const createStatusEstabilizadoresService = new CreateStatusEstabilizadoresService();

        const status = await createStatusEstabilizadoresService.execute(name);

        return res.json(status);
    }
}

export {CreateStatusEstabilizadoresController}