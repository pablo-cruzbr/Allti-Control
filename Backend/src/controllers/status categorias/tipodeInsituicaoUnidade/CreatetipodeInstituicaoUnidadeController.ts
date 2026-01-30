import { Response, Request } from "express";
import { CreateTipodeInsituicaoUnidadeService } from "../../../services/status_categorias/tipodeInstuicaoUnidade/CreateTipodeInsituicaoUnidadeService";

class CreatetipodeInstituicaoUnidadeController {
    async handle(req: Request, res: Response){
        const {name} = req.body;

        const  createTipodeInstituicaoUnidadeService  = new  CreateTipodeInsituicaoUnidadeService();
        const status = await createTipodeInstituicaoUnidadeService.execute(name);

        return res.json(status);

    }
}

export {CreatetipodeInstituicaoUnidadeController}