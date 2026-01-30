import { Response, Request } from "express";
import { CreateTecnicoService } from "../../../services/status_categorias/tecnico/CreateTecnicoService";

class CreateTecnicoController{
    async handle(req: Request, res: Response){
        const {name} = req.body;

        const createTecnicoService = new CreateTecnicoService()

         const tecnico = await createTecnicoService.execute(name);

         return res.json(tecnico);
    }
}

export {CreateTecnicoController}