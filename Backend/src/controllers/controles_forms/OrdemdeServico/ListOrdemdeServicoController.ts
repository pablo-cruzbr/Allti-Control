import { Request, Response } from "express";
import { ListOrdemdeServicoService } from "../../../services/controles_forms/OrdemdeServico/ListOrdemdeServicoService";

class ListOrdemdeServicoController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const service = new ListOrdemdeServicoService();
        const result = await service.execute({ user_id });

        return res.json(result);
    }
}

export { ListOrdemdeServicoController };