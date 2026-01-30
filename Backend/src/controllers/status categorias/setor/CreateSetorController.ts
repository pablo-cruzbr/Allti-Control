import { Response, Request } from "express";
import {CreateSetorService } from "../../../services/status_categorias/Setor/CreateSetorService";

class CreateSetorController {
    async handle(req: Request, res: Response){
        const {name} = req.body;

        const createSetorService = new CreateSetorService();

        const setor = await createSetorService.execute({
      name,
    });

        return res.json(setor);
    }
}

export {CreateSetorController}