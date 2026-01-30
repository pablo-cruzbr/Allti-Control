import { Response, Request } from "express";
import { DetailControledeLaboratorioService } from "../../../services/controles_forms/ControledeLaboratorio/DetailControledeLaboratorioService";
class DetailControledeLaboratorioController {
    async handle(req: Request, res: Response){
        const controle_id = req.query.controle_id as string

        
        const detailControledeLaboratorioService = new DetailControledeLaboratorioService();
        

        const orders = await detailControledeLaboratorioService.execute({
          controle_id    
        });

        return res.json(orders);
    }
    
}


export {DetailControledeLaboratorioController}

