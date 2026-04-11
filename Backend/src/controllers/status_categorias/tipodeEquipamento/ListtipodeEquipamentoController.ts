import { Response, Request } from "express";
import { ListtipodeEquipamentoService } from "../../../services/status_categorias/tipodeEquipamento/ListTipodeEquipamentoService";
class ListtipodeEquipamentoController{
    async handle (req: Request, res: Response){
        const listtipodeEquipamentoService = new ListtipodeEquipamentoService();

        const status = await listtipodeEquipamentoService.execute();

        return res.json(status);
    }
}

export {ListtipodeEquipamentoController}