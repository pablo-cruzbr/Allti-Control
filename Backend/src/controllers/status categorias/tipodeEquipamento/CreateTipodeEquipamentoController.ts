import { Response, Request } from "express";
import { CreateTipodeEquipamentoService } from "../../../services/status_categorias/tipodeEquipamento/CreateTipodeEquipamentoService";
class CreatetipodeChamadoController {
    async handle(req: Request, res: Response){
        const {name} = req.body;

        const  createTipodeEquipamentoService  = new  CreateTipodeEquipamentoService ();
        const status = await createTipodeEquipamentoService.execute(name);

        return res.json(status);

    }
}

export {CreatetipodeChamadoController}