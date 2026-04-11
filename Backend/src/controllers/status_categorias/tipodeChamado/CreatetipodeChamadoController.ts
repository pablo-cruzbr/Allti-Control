import { Response, Request } from "express";
import { CreateTipodeChamadoService } from "../../../services/status_categorias/tipodeChamado/CreatetipodeChamadoService";

class CreatetipodeChamadoController {
    async handle(req: Request, res: Response){
        const {name} = req.body;

        const  createTipodeChamadoService  = new  CreateTipodeChamadoService();
        const status = await createTipodeChamadoService.execute(name);

        return res.json(status);

    }
}

export {CreatetipodeChamadoController}