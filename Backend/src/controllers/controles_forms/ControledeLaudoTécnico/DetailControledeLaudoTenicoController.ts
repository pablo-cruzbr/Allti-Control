import { Response, Request } from "express";
import { DetailLaudoTecnicoService } from "../../../services/controles_forms/ControledeLaudoTécnico/DetailControledeLaudoTenicoService";
class DetailLaudoTenicoController {
    async handle(req: Request, res: Response){
        const controle_id = req.query.controle_id as string

        
        const detailLaudoTecnicoService = new DetailLaudoTecnicoService();
        

        const orders = await detailLaudoTecnicoService.execute({
          controle_id    
        });

        return res.json(orders);
    }
    
}


export {DetailLaudoTenicoController}

