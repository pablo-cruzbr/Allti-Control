import { Request, Response } from "express";
// ⚠️ Importa o Service recém-criado
import { ListOrdemdeServicoId } from "../../../services/controles_forms/OrdemdeServico/LitsOrdemdeServicoId";

class GetOrdemdeServicoByIdController { 
    async handle(req: Request, res: Response) {
        try {
            // ✅ Captura o ID do parâmetro da URL (/:id)
            const id = req.params.id as string; 

            if (!id) {
                return res.status(400).json({ error: "O ID da Ordem de Serviço é obrigatório." });
            }

            const getByIdService = new ListOrdemdeServicoId(); 
            
            // ✅ Passa o ID dentro do objeto que o Service espera ({ id: string })
            const ordem = await getByIdService.execute({ id }); 

            if (!ordem) {
                // Se a OS não for encontrada, retorne 404
                return res.status(404).json({ error: "Ordem de Serviço não encontrada." });
            }

            // ✅ Retorna o objeto único da OS
            return res.json(ordem); 
        } catch (error) {
            console.error("Erro ao buscar ordem por ID:", error);
            return res.status(500).json({ error: "Erro interno ao buscar ordem de serviço" });
        }
    }
}

export { GetOrdemdeServicoByIdController };