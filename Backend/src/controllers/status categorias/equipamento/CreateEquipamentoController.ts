import { Request, Response } from "express";
import { CreateEquipamentoService } from "../../../services/status_categorias/Equipamento/CreateEquipamentoService";

class CreateEquipamentoController {
    async handle(req: Request, res:Response){
       
        const {name, patrimonio, instituicaoUnidade_id} = req.body
        const createEquipamentoService = new CreateEquipamentoService();

        const equipamento = await createEquipamentoService.execute(name, patrimonio, instituicaoUnidade_id);

        return res.json(equipamento)
    }
}

export {CreateEquipamentoController}