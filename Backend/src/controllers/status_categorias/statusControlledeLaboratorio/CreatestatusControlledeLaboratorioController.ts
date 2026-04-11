import { Response, Request } from "express";
import { CreateControlledeLaboratorioService } from "../../../services/status_categorias/statusControlledeLaboratorio/CreatestatusControlledeLaboratorioService";

class CreatestatusControlledeLaboratorioController{
    async hadle(req: Request, res: Response){
        const {name} = req.body;
        const createControlledeLaboratorioService = new CreateControlledeLaboratorioService();

        const status = await createControlledeLaboratorioService.execute(name);

        return res.json(status);
    }
}

export {CreatestatusControlledeLaboratorioController}