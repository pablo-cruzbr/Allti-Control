import { Response, Request } from "express";
import { CreateStatusTarefaService } from "../../../services/status_categorias/tarefa/CreateStatusTarefaService";
class CreateStatusTarefaController{
    async handle(req: Request, res: Response){
        const {name} = req.body;

        const createStatusTarefaService = new CreateStatusTarefaService();

        const status = await createStatusTarefaService.execute({name});

        return res.json(status);
    }
}

export {CreateStatusTarefaController};
