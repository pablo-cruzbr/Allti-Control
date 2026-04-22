import { Response, Request } from "express";

import { ListStatusTarefaService } from "../../../services/status_categorias/tarefa/ListStatusTarefaService";

class  ListStatusTarefaController{
    async handle (req: Request, res: Response){
       
            const listStatusTarefaService = new ListStatusTarefaService();

            const category = await listStatusTarefaService.execute();

            return res.json(category)
    }
}
export {ListStatusTarefaController}