import { Response, Request } from "express";

import { ListStatusUrgenciaService } from "../../../services/status_categorias/statusUrgencia/ListStatusUrgenciaService";

class  ListStatusUrgenciaController{
    async handle (req: Request, res: Response){
       
            const listStatusUrgenciaService = new ListStatusUrgenciaService();

            const category = await listStatusUrgenciaService.execute();

            return res.json(category)
    }
}
export {ListStatusUrgenciaController}