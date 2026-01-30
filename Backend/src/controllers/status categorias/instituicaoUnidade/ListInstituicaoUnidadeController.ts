import { Response, Request } from "express";
import { ListInstituicaoUnidadeService } from "../../../services/status_categorias/instituicaoUnidade/ListInstituicaoUnidadeService";

class ListInstituicaoUnidadeController {
  async handle(req: Request, res: Response) {
    const service = new ListInstituicaoUnidadeService();
    const { instituicoes, total } = await service.execute();

    return res.json({
      instituicoes,
      total,
    });
  }
}

export { ListInstituicaoUnidadeController };
