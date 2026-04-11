import { Response, Request } from "express";
import { CreateStatusReparoService } from "../../../services/status_categorias/statusReparo/CreatestatusReparoService";

class CreateStatusReparoController{
    async handle(req: Request, res: Response){
        const {name} = req.body;

        const createStatusReparoService = new CreateStatusReparoService();

        const status = await createStatusReparoService.execute({name});

        return res.json(status);
    }
}

export {CreateStatusReparoController};
