import prismaClient from "../../../../prisma";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

interface SaveAssinaturaInput {
  ordemId: string;
  assinaturaBase64: string;
}

class SaveAssinaturaService {
  async execute({ ordemId, assinaturaBase64 }: SaveAssinaturaInput) {
   
    const ordem = await prismaClient.ordemdeServico.findUnique({
      where: { id: ordemId },
      select: { id: true },
    });

    if (!ordem) {
      throw new Error("Ordem de serviço não encontrada");
    }

   
    const uploadResult: UploadApiResponse = await cloudinary.uploader.upload(
      assinaturaBase64,
      {
        folder: "assinaturas_ordem",
        format: "jpg", 
      }
    );

    const updatedOrdem = await prismaClient.ordemdeServico.update({
      where: { id: ordemId },
      data: {
        assinaturaDigital: uploadResult.secure_url,
      },
    });

    return updatedOrdem;
  }
}

export { SaveAssinaturaService };
