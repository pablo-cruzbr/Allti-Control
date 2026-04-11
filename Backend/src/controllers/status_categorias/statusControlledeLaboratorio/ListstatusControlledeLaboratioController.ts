import { Request, Response } from "express";
import { ListstatusControlleLaboratioService } from "../../../services/status_categorias/statusControlledeLaboratorio/ListstatusControlledeLaboratioService";

class ListstatusControlleLaboratioController{
    async handle(req: Request, res: Response){
        const liststatusControlleLaboratioService = new ListstatusControlleLaboratioService();

        const status = await liststatusControlleLaboratioService.execute();

        return res.json(status);
    }
}

export {ListstatusControlleLaboratioController}