import { Response, Request } from "express";
import { CreateTipodeOrdemdeServicoService } from "../../../services/status_categorias/tipodeOrdemdeServico/CreatetipodeOrdemdeServicoService";

class CreatetipodeOrdemdeServicoController {
    async handle(req: Request, res: Response){
        const {name} = req.body;

        const  createTipodeOrdemdeServicoService  = new  CreateTipodeOrdemdeServicoService ();
        const status = await createTipodeOrdemdeServicoService.execute(name);

        return res.json(status);

    }
}

export {CreatetipodeOrdemdeServicoController}