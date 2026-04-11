import { Response, Request } from "express";
import { RemoveSetorService } from "../../../services/status_categorias/Setor/RemoveSetorService";

class RemoveSetorController {
    async handle(req: Request, res: Response){
        const setor_id = req.query.setor_id as string;

        const removeSetorService = new RemoveSetorService();

        const setor = await removeSetorService.execute({
            setor_id
        });
        return res.json(setor)
    }
}

export {RemoveSetorController}