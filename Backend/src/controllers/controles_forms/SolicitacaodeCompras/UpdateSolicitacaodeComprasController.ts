import { Request, Response } from "express";
import { UpdateSolicitacaodeComprasService, UpdateSolicitacaodeComprasRequest } from "../../../services/controles_forms/SolicitacaodeCompras/UpdateSolicitacaodeComprasService";

class UpdateSolicitacaodeComprasController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    // Desestrutura os dados do body
    const {
      itemSolicitado,
      solicitante,
      motivoDaSolicitacao,
      preco,
      linkDeCompra,
      statusCompras_id
    } = req.body;

    // Monta o objeto do tipo UpdateSolicitacaodeComprasRequest
    const data: UpdateSolicitacaodeComprasRequest = {
      id,
      itemSolicitado,
      solicitante,
      motivoDaSolicitacao,
      preco,
      linkDeCompra,
      statusCompras_id
    };

    try {
      const service = new UpdateSolicitacaodeComprasService();
      const result = await service.execute(data);
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { UpdateSolicitacaodeComprasController };
