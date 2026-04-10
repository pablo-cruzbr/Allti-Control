import { Request, Response } from 'express';
import { ListAtividadePadraoService } from '../../../services/status_categorias/Atividade/ListAtividadeService';

class ListAtividadePadraoController {
  async handle(req: Request, res: Response) {
    const categoria = req.query.categoria as "EXTERNO" | "LABORATORIO" | undefined;

    const listAtividadeService = new ListAtividadePadraoService();

    const atividades = await listAtividadeService.execute({ categoria });

    return res.json(atividades);
  }
}

export { ListAtividadePadraoController };