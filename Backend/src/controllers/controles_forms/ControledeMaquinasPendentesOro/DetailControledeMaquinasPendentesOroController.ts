import { Response, Request } from "express";
import { DetailControledeMaquinasPendentesOroService } from "../../../services/controles_forms/ControledeMaquinasPendentesOro/DetailControledeMaquinasPendentesOroService";
class DetailControledeMaquinasPendentesOroController {
    async handle(req: Request, res: Response){
        const controle_id = req.query.controle_id as string

        
        const detailControledeMaquinasPendentesOroService = new DetailControledeMaquinasPendentesOroService();
        

        const orders = await detailControledeMaquinasPendentesOroService.execute({
          controle_id    
        });

        return res.json(orders);
    }
    
}


export {DetailControledeMaquinasPendentesOroController}

