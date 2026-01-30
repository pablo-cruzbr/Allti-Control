// src/controllers/AssinaturaController.ts
import { Request, Response } from "express";
import prismaClient from "../../../../prisma";
import { v2 as cloudinary } from "cloudinary";

// Service interno para criar/atualizar assinatura
async function saveAssinatura(ordemId: string, assinaturaBase64: string) {
  // Verifica se a ordem existe
  const ordem = await prismaClient.ordemdeServico.findUnique({
    where: { id: ordemId },
  });

  if (!ordem) {
    throw new Error("Ordem de serviço não encontrada");
  }

  // Upload da assinatura para Cloudinary
  const uploadResult = await cloudinary.uploader.upload(assinaturaBase64, {
    folder: "assinaturas_ordem",
    format: "jpg",
  });

  // Atualiza a URL da assinatura no banco
  return prismaClient.ordemdeServico.update({
    where: { id: ordemId },
    data: { assinaturaDigital: uploadResult.secure_url },
  });
}

// Controller único
export const AssinaturaController = {
  // PATCH → criar/atualizar assinatura
  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params; // ordemId da URL
      const { assinaturaBase64 } = req.body; // assinatura em base64

      if (!assinaturaBase64) {
        return res.status(400).json({ error: "Assinatura não fornecida" });
      }

      const ordemAtualizada = await saveAssinatura(id, assinaturaBase64);
      return res.json({ assinatura: ordemAtualizada.assinaturaDigital });
    } catch (error: any) {
      console.error("Erro ao atualizar assinatura:", error);
      return res.status(400).json({ error: error.message });
    }
  },

  // GET → buscar assinatura
  async buscar(req: Request, res: Response) {
    try {
      const { ordemId } = req.params;

      if (!ordemId) {
        return res.status(400).json({ error: "ID da ordem não fornecido" });
      }

      const ordem = await prismaClient.ordemdeServico.findUnique({
        where: { id: ordemId },
        select: { assinaturaDigital: true },
      });

      if (!ordem) {
        return res.status(404).json({ error: "Ordem não encontrada" });
      }

      return res.json({ assinatura: ordem.assinaturaDigital || null });
    } catch (error) {
      console.error("Erro ao buscar assinatura:", error);
      return res.status(500).json({ error: "Erro ao buscar assinatura" });
    }
  },
};
