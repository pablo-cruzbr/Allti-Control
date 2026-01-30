import { Request, Response } from "express";
import { UpdateDocumentacaoTecnicaService, UpdateDocumentacaoTecnicaRequest } from "../../../services/controles_forms/DocumentacaoTecnica/UpdateDocumentacaoTecnicaService";

class UpdateDocumentacaoTecnicaController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    // Desestrutura os dados do body
    const {
        titulo,
        descricao, 
        cliente_id,
        tecnico_id,
        instituicaoUnidade_id
    } = req.body;

    // Monta o objeto do tipo UpdateDocumentacaoTecnicaRequest
    const data: UpdateDocumentacaoTecnicaRequest = {
        id, 
        titulo,
        descricao, 
        cliente_id,
        tecnico_id,
        instituicaoUnidade_id
    };

    try {
      const service = new UpdateDocumentacaoTecnicaService();
      const result = await service.execute(data);
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { UpdateDocumentacaoTecnicaController };
