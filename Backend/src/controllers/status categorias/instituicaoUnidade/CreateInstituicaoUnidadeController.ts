import { Request, Response } from "express";
import { CreateInstituicaoUnidadeService } from "../../../services/status_categorias/instituicaoUnidade/CreateInstituicaoUnidadeService";

class CreateInstituicaoUnidadeController {
  async handle(req: Request, res: Response) {
    const { name, endereco, tipodeInstituicaoUnidade_id, telefone } = req.body;

    const createInstituicaoUnidadeService = new CreateInstituicaoUnidadeService();

    const instituicao = await createInstituicaoUnidadeService.execute({
      name,
      endereco,
      tipodeInstituicaoUnidade_id,
      telefone
    });

    return res.json(instituicao);
  }
}

export { CreateInstituicaoUnidadeController };
