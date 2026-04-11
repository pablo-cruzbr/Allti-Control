import { Response, Request } from "express";
import { CreatestatusMaquinasPendentesOroService } from "../../../services/status_categorias/statusMaquinasPendentesOro/CreatestatusMaquinasPendentesOroService";

class CreatestatusMaquinasPendentesOroController{
    async handle(req: Request, res: Response){
        const {name} = req.body;

        const createstatusMaquinasPendentesOroService = new CreatestatusMaquinasPendentesOroService();

        const status = await createstatusMaquinasPendentesOroService.execute(name);

        return res.json(status);
    }
}

export {CreatestatusMaquinasPendentesOroController};