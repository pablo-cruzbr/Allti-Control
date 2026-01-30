import { Request, Response } from "express";
import prismaClient from "../../../prisma";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { UploadedFile } from "express-fileupload";

export class fotoController {
  async handle(req: Request, res: Response) {
    try {
      const { ordemdeServico_id } = req.body;

      const debugInfo = {
        receivedHeaders: req.headers["content-type"], 
        hasFiles: !!req.files,
        fileKeys: req.files ? Object.keys(req.files) : [], 
        bodyKeys: Object.keys(req.body), 
        bodyValues: req.body
        };

      if (!req.files || !("file" in req.files)) {
        console.log("-> Erro de diagnóstico:", debugInfo);
        return res.status(400).json({ 
          error: "Arquivo não enviado ou campo 'file' ausente.",
          diagnostico: {
            orientacao: "Certifique-se de que o campo no Insomnia se chama exatamente 'file' e é do tipo File.",
            dadosRecebidos: debugInfo
          }
        });
      }

      if (!ordemdeServico_id) {
        return res.status(400).json({ error: "ID da ordem de serviço é obrigatório." });
      }

      const uploaded = req.files["file"];
      const files = Array.isArray(uploaded)
        ? (uploaded as unknown as UploadedFile[])
        : [uploaded as UploadedFile];

      const fotos = [];

      for (const file of files) {
        console.log(`-> Iniciando upload: ${file.name}`);

        const uploadResult: UploadApiResponse = await cloudinary.uploader.upload(
          file.tempFilePath,
          { folder: "ordens_servico" }
        );

        const foto = await prismaClient.fotoOrdemServico.create({
          data: {
            url: uploadResult.secure_url,
            ordemdeServico_id: ordemdeServico_id, // Agora a variável existe!
          },
        });

        fotos.push(foto);
      }
      return res.json(fotos);

    } catch (error: any) {
      console.error("-> Erro durante a requisição:", error);
      return res.status(400).json({ error: error.message });
    }
  }

  async listByOrdem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const fotos = await prismaClient.fotoOrdemServico.findMany({
        where: { ordemdeServico_id: id },
        orderBy: { created_at: "desc" },
      });
      return res.json(fotos);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const foto = await prismaClient.fotoOrdemServico.findUnique({
        where: { id },
      });

      if (!foto) {
        return res.status(404).json({ error: "Foto não encontrada." });
      }

      const urlParts = foto.url.split("/");
      const fileName = urlParts[urlParts.length - 1];
      const publicId = "ordens_servico/" + fileName.split(".")[0];

      await cloudinary.uploader.destroy(publicId);

      await prismaClient.fotoOrdemServico.delete({
        where: { id },
      });

      return res.json({ message: "Foto deletada com sucesso." });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}