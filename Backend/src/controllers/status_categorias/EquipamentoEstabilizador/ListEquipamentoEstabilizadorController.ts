import { Response, Request } from "express";
import { ListEquipamentoEstabilizadorService } from "../../../services/status_categorias/EquipamentoEstabilizador/ListEquipamentoEstabilizadorService";

class ListEsquipamentoEstabilizadorController{
    async handle(req: Request, res: Response){
        const listEquipamentoEstabilizadorService = new ListEquipamentoEstabilizadorService();

        const equipamento = await listEquipamentoEstabilizadorService.execute();
        
        return res.json(equipamento);
        
    }
}

export {ListEsquipamentoEstabilizadorController}