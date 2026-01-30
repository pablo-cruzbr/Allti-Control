import { Request, Response } from "express";

import { CreateStatusUrgenciaService } from "../../../services/status_categorias/statusUrgencia/CreateStatusUrgenciaService";

class CreateStatusUrgenciaController{
    async handle(req:Request, res: Response){
        const {name} = req.body;

        const createStatusUrgenciaService = new CreateStatusUrgenciaService();

        const category = await createStatusUrgenciaService.execute(name);

        return res.json(category);

    }
}

export {CreateStatusUrgenciaController}