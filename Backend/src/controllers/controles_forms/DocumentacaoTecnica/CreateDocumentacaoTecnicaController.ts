import { Response, Request } from "express";
import { CreateDocumentacaoTecnicaService } from "../../../services/controles_forms/DocumentacaoTecnica/CreateDocumentacaoTecnicaService";


class CreateDocumentacaoTecnicaController{
    async handle(req: Request, res: Response) {
        const {
            id,
            titulo,
            descricao,
            cliente_id,
            tecnico_id,
            instituicaoUnidade_id,
        } = req.body

        const createDocumentacaoTecnicaService = new CreateDocumentacaoTecnicaService();

        const controle = await createDocumentacaoTecnicaService.execute({
            id,
            titulo,
            descricao,
            cliente_id,
            tecnico_id,
            instituicaoUnidade_id,
        });

        return res.json(controle);
    }
}

export { CreateDocumentacaoTecnicaController};
