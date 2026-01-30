import { Request, Response } from "express";
import { ListDocumentacaoTecnicaService } from "../../../services/controles_forms/DocumentacaoTecnica/ListDocumentacaoTecnicaService";

class ListDocumentacaoTecnicaController{
    async handle(req: Request, res: Response){
        const service = new ListDocumentacaoTecnicaService();
        const result = await service.execute();

        return res.json(result);
    }
}

export {ListDocumentacaoTecnicaController}