import { Request, Response } from "express";
import { CreatestatusMaquinasPendentesService } from "../../../services/status_categorias/statusMaquinasPendentes/CreatestatusMaquinasPendentesService";

class CreatestatusMaquinasPendentesController{
    async handle(req: Request, res:Response){
        const {name} = req.body
        const createstatusMaquinasPendentesService = new CreatestatusMaquinasPendentesService();

        const status = await createstatusMaquinasPendentesService.execute(name);

        return res.json(status)
    }
}

export {CreatestatusMaquinasPendentesController}