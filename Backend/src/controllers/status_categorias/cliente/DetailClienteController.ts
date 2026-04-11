import { Response, Request } from "express";
import { DetailClienteService } from "../../../services/status_categorias/Cliente/DetailClienteService";
class DetailClienteController {
    async handle(req: Request, res: Response){
        const controle_id = req.query.controle_id as string

        
        const detailClienteService  = new DetailClienteService ();
        

        const orders = await detailClienteService .execute({
          controle_id    
        });

        return res.json(orders);
    }
    
}


export {DetailClienteController }

