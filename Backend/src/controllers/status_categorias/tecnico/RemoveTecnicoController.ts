import { Request, Response } from "express";
import { RemoveTecnicoService } from "../../../services/status_categorias/tecnico/RemoveTecnicoService";

class RemoveTecnicoController{
    async handle(req: Request, res: Response){
        const tecnico_id = req.query.tecnico_id as string;

        const removeTecnicoService = new RemoveTecnicoService();

        const tecnico = await removeTecnicoService.execute({
            tecnico_id
        });
        return res.json(tecnico)
    }
}
export {RemoveTecnicoController}