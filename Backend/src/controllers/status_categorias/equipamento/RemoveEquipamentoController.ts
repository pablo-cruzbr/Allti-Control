import { Request, Response } from "express";
import { RemoveEquipamentoService } from "../../../services/status_categorias/Equipamento/RemoveEquipamentoService";

class RemoveEquipamentoController {
    async handle(req: Request, res:Response){
        const equipamento_id = req.query.equipamento_id as string;

        const   removeEquipamentoService  = new RemoveEquipamentoService();

        const equipamento = await removeEquipamentoService.execute({
            equipamento_id
        });

        return res.json(equipamento)
    }
}

export {RemoveEquipamentoController}