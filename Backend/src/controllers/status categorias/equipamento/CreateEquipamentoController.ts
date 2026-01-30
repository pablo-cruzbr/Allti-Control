import { Request, Response } from "express";
import { CreateEquipamentoService } from "../../../services/status_categorias/Equipamento/CreateEquipamentoService";

class CreateEquipamentoController {
    async handle(req: Request, res:Response){
       
        const {name, patrimonio} = req.body
        const createEquipamentoService = new CreateEquipamentoService();

        const equipamento = await createEquipamentoService.execute(name, patrimonio);

        return res.json(equipamento)
    }
}

export {CreateEquipamentoController}