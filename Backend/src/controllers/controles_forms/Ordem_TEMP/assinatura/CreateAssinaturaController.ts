import { Request, Response } from "express";
import { CreatedAssinaturaService } from "../../../../services/controles_forms/OrdemdeServico/assinatura/CreatedAssinaturaService"; 

export const CreateAssinaturaController = {
  async atualizarAssinatura(req: Request, res: Response) {
    try {
      const { id } = req.params; // ordemId vindo da URL
      const { assinaturaBase64 } = req.body; // assinatura enviada em base64

      const ordem = await CreatedAssinaturaService.atualizarAssinatura({
        ordemId: id,
        assinaturaBase64,
      });

      return res.json(ordem);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  },
};
