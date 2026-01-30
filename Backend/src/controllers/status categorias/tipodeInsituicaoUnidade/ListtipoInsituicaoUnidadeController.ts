import { Response, Request } from "express";
import { ListtipodeInstituicaoUnidadeService } from "../../../services/status_categorias/tipodeInstuicaoUnidade/ListtipodeInstituicaoUnidadeService";

class ListtipoInsituicaoUnidadeController{
    async handle (req: Request, res: Response){
        const listtipodeInstituicaoUnidadeService = new ListtipodeInstituicaoUnidadeService();

        const status = await listtipodeInstituicaoUnidadeService.execute();

        return res.json(status);
    }
}

export {ListtipoInsituicaoUnidadeController}