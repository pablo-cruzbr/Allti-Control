import { Response, Request } from "express";
import { CreateStatusOrdemdeServicoService } from "../../../services/status_categorias/statusOrdemdeServico/CreateStatusOrdemdeServicoService";

class CreateStatusOrdemdeServicoController{
    async handle(req: Request, res: Response){
        const {name} = req.body;

        const createStatusOrdemdeServicoService = new CreateStatusOrdemdeServicoService();

        const status = await createStatusOrdemdeServicoService.execute(name);

        return res.json(status);
    }
}

export {CreateStatusOrdemdeServicoController}