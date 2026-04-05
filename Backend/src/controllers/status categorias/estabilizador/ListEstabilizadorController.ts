import { Response, Request } from "express";
import { ListEstabilizadoresService } from "../../../services/status_categorias/statusEstabilizadores/ListEstabilizadoresService";

class ListEstabilizadorController{
    async handle(req: Request, res: Response){
        const listEstabilizadoreService = new ListEstabilizadoresService();

        const estabilizador = await listEstabilizadoreService.execute();
        
        return res.json(estabilizador);
        
    }
}

export {ListEstabilizadorController}