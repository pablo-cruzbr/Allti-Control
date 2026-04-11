import { Response, Request } from "express";
import { RemoveInstituicaoUnidadeService } from "../../../services/status_categorias/instituicaoUnidade/RemoveInstituicaoUnidadeService";

class RemoveInstituicaoUnidadeController{
    async handle(req: Request, res: Response){
        const instituicao_id = req.query.instituicao_id as string;

        const removeInstituicaoUnidadeService = new RemoveInstituicaoUnidadeService();

        const insituicao = await removeInstituicaoUnidadeService.execute({
            instituicao_id
        });
        return res.json(insituicao)
    }
}

export {RemoveInstituicaoUnidadeController}