import { Request, Response } from "express";
import { CreateEquipamentoEstabilizadorService } from "../../../services/status_categorias/EquipamentoEstabilizador/CreateEquipamentoEstabilizadorService";

class CreateEquipamentoEstabilizadorController {
    async handle(req: Request, res:Response){
       
        const {name, patrimonio} = req.body
        const createEquipamentoEstabilizadorService = new CreateEquipamentoEstabilizadorService();

        const equipamento = await createEquipamentoEstabilizadorService.execute(name, patrimonio);

        return res.json(equipamento)
    }
}

export {CreateEquipamentoEstabilizadorController}