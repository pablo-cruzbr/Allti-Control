import { Request, Response } from "express";
import { CreateStatusPrioridadeService } from "../../../services/status_categorias/statusUrgencia/CreateStatusPrioridadeService";

class CreateStatusUrgenciaController{
    async handle(req:Request, res: Response){
        const {name} = req.body;

        const createStatusPrioridadeService = new CreateStatusPrioridadeService();

        const category = await createStatusPrioridadeService.execute(name);

        return res.json(category);

    }
}

export {CreateStatusUrgenciaController}