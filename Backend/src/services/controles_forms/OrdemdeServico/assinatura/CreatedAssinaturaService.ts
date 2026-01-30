import prismaClient from "../../../../prisma";
import { v2 as cloudinary } from "cloudinary";

interface UpdateAssinaturaInput {
  ordemId: string;
  assinaturaBase64: string; // agora é base64
}

export const CreatedAssinaturaService = {
  async atualizarAssinatura({ ordemId, assinaturaBase64 }: UpdateAssinaturaInput) {
    // Verifica se a ordem existe
    const ordem = await prismaClient.ordemdeServico.findUnique({
      where: { id: ordemId },
    });

    if (!ordem) {
      throw new Error("Ordem de serviço não encontrada");
    }

    // Faz upload da assinatura para o Cloudinary
    const uploadResult = await cloudinary.uploader.upload(assinaturaBase64, {
      folder: "assinaturas_ordem",
      format: "jpg",
    });

    // Atualiza a URL da assinatura no banco
    return prismaClient.ordemdeServico.update({
      where: { id: ordemId },
      data: { assinaturaDigital: uploadResult.secure_url },
    });
  },
};
