import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import prismaClient from "../../../../prisma";

export class SaveAssinaturaController {
  async handle(req: Request, res: Response) {
    const { ordemId } = req.body;
    const { assinaturaBase64 } = req.body; 

    try {
      if (!ordemId || !assinaturaBase64) {
        return res.status(400).json({ error: "Ordem ID ou assinatura não fornecidos" });
      }

    
      const ordem = await prismaClient.ordemdeServico.findUnique({
        where: { id: ordemId },
      });

      if (!ordem) {
        return res.status(404).json({ error: "Ordem não encontrada" });
      }

      
      const uploadResult = await cloudinary.uploader.upload(assinaturaBase64, {
        folder: "assinaturas_ordem",
        format: "jpg",
      });

     
      const updatedOrdem = await prismaClient.ordemdeServico.update({
        where: { id: ordemId },
        data: { assinaturaDigital: uploadResult.secure_url },
      });

      return res.json({ assinatura: updatedOrdem.assinaturaDigital });
    } catch (error: any) {
      console.error("Erro ao salvar assinatura:", error);
      return res.status(500).json({ error: error.message });
    }
  }
}
