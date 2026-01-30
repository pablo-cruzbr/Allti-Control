import { Response, Request } from "express";
import { DetailComprasService } from "../../../services/controles_forms/SolicitacaodeCompras/DetailSolicitacaodeComprasService";
class DetailComprasController {
    async handle(req: Request, res: Response){
        const compra_id = req.query.compra_id as string

        
        const detailComprasService = new DetailComprasService();
        

        const orders = await detailComprasService.execute({
          compra_id    
        });

        return res.json(orders);
    }
    
}


export {DetailComprasController}

