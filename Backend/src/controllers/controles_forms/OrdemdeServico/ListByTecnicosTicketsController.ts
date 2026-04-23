import { Request, Response } from "express";
import { ListOrdemdeServicoTecnicoService } from "../../../services/controles_forms/OrdemdeServico/ListOrdemdeServicoTecnicoService";

class ListByTecnicosTicketsController {
    async handle(req: Request, res: Response) {
        try {
            const tecnico_id = req.query.tecnico_id as string;

            const listByTecnico = new ListOrdemdeServicoTecnicoService();
            const ordens = await listByTecnico.execute({ tecnico_id });

            return res.json(ordens);
        } catch (error) {
            console.error("Erro ao listar ordens por técnico:", error);
            return res.status(500).json({ error: "Erro interno ao buscar ordens" });
        }
    }
}

export { ListByTecnicosTicketsController };
