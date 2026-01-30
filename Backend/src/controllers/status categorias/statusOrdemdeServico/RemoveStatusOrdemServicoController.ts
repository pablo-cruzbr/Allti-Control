import { Response, Request } from "express";
import { RemoveStatusOrdemServicoService } from "../../../services/status_categorias/statusOrdemdeServico/RemoveStatusOrdemServicoService";

class RemoveStatusOrdemServicoController {
    async handle(req: Request, res: Response){
        const statusOrdem_id = req.query.statusOrdem_id as string;

        const removeStatusOrdemServicoService = new RemoveStatusOrdemServicoService();

        const status = await removeStatusOrdemServicoService.execute({
            statusOrdem_id
        });
        return res.json(status);
    }
}

export {RemoveStatusOrdemServicoController}