import { Response, Request } from "express";
import { ListEquipamentoService } from "../../../services/status_categorias/Equipamento/ListEquipamentoService";

class ListEquipamentoController{
    async handle(req: Request, res: Response){
        const listEquipamentoService = new ListEquipamentoService();

        const equipamento = await listEquipamentoService.execute();
        
        return res.json(equipamento);
        
    }
}

export {ListEquipamentoController}