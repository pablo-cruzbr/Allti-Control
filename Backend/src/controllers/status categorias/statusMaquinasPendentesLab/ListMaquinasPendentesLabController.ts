import { Request, Response } from "express";
import { ListMaquinasPendentesLabService } from "../../../services/status_categorias/statusMaquinasPendentes/ListMaquinasPendentesLabService";

class ListMaquinasPendentesLabController{
    async handle (req: Request, res: Response){
      const listMaquinasPendentesLabService = new ListMaquinasPendentesLabService();

      const status = await  listMaquinasPendentesLabService.execute();
      
      return res.json(status);
    }
}

export {ListMaquinasPendentesLabController}