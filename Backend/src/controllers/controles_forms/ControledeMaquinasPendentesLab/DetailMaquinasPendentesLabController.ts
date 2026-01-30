import { Response, Request } from "express";
import { DetailMaquinasPendentesLabService } from "../../../services/controles_forms/ControledeMaquinasPendentesLab/DetailMaquinasPendentesLabService";
class DetailMaquinasPendentesLabController {
    async handle(req: Request, res: Response){
        const controle_id  = req.query.controle_id  as string

        
        const detailMaquinasPendentesLabService = new DetailMaquinasPendentesLabService();
        

        const orders = await detailMaquinasPendentesLabService.execute({
          controle_id    
        });

        return res.json(orders);
    }
    
}


export {DetailMaquinasPendentesLabController}

