import { Request, Response } from "express";
import { ListMaquinasPendentesOroService } from "../../../services/status_categorias/statusMaquinasPendentesOro/ListstatusMaquinasPendentesOroService";

class ListMaquinasPendentesOroController{
    async handle(req: Request, res: Response){
        const listMaquinasPendentesOroService = new ListMaquinasPendentesOroService();

        const status = await listMaquinasPendentesOroService.execute();

        return res.json(status);
    }
}
export {ListMaquinasPendentesOroController}