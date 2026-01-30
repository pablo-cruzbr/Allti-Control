import { Request, Response } from "express";
import { ListControledeMaquinasPendentesLabService } from "../../../services/controles_forms/ControledeMaquinasPendentesLab/ListControledeMaquinasPendentesLabService";
class ListControledeMaquinasPendentesLabController{
    async handle(req: Request, res: Response){
        const service = new ListControledeMaquinasPendentesLabService ();
        const {controles, total, totalPendenteOro, totalSubstituta} = await service.execute();
        const result = await service.execute();

        return res.json({
            result,
            controles,
            total,
            totalPendenteOro,
            totalSubstituta
        });
    }
}

export {ListControledeMaquinasPendentesLabController}