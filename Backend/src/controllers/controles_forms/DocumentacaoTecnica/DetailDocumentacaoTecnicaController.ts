import { Response, Request } from "express";
import { DetailDocumentacaoTecnicaService } from "../../../services/controles_forms/DocumentacaoTecnica/DetailDocumentacaoTecnicaService";
class DetailDocumentacaoTecnicaController {
    async handle(req: Request, res: Response){
        const controle_id = req.query.controle_id as string

        
        const detailDocumentacaoTecnicaService = new DetailDocumentacaoTecnicaService();
        

        const orders = await detailDocumentacaoTecnicaService.execute({
          controle_id    
        });

        return res.json(orders);
    }
    
}


export {DetailDocumentacaoTecnicaController}

