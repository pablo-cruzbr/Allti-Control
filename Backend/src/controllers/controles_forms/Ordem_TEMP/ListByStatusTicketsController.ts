import { Request, Response } from "express";
import { ListOrdemdeServicoStatusService } from "../../../services/controles_forms/OrdemdeServico/ListOrdemdeServicoStatusService";

class ListByStatusTicketsController {
    async handle(req: Request, res: Response) {
        try {
            const statusOrdemdeServico_id = req.query.statusOrdemdeServico_id as string;

            const listByStatus = new ListOrdemdeServicoStatusService();
            const ordens = await listByStatus.execute({ statusOrdemdeServico_id });

            return res.json(ordens);
        } catch (error) {
            console.error("Erro ao listar ordens por status:", error);
            return res.status(500).json({ error: "Erro interno ao buscar ordens" });
        }
    }
}

export { ListByStatusTicketsController };
