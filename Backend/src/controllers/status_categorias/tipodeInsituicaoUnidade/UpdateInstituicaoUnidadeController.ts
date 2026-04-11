import { Response, Request } from "express";
import { UpdateInstituicaoUnidadeService } from "../../../services/status_categorias/instituicaoUnidade/UpdateInstiuicaoUnidadeService";

class UpdateInstituicaoUnidadeController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const { name, endereco, tipodeInstituicaoUnidade_id, telefone } = req.body;

        if (!id) {
            return res.status(400).json({ error: "O ID da instituição é obrigatório para atualização." });
        }

        const updateInstituicaoUnidadeService = new UpdateInstituicaoUnidadeService();

        try {
            const instituicao = await updateInstituicaoUnidadeService.execute({
                id,
                name,
                endereco,
                telefone,
                tipodeInstituicaoUnidade_id
            });
            return res.json(instituicao);
            
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { UpdateInstituicaoUnidadeController };