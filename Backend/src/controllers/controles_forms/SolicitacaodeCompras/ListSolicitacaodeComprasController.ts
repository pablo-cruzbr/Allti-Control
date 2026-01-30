import { Request, Response } from "express";
import { ListSolicitacaodeComprasService } from "../../../services/controles_forms/SolicitacaodeCompras/ListSolicitacaodeComprasService";
class ListSolicitacaodeComprasController{
    async handle(req: Request, res: Response){
        const service = new ListSolicitacaodeComprasService();
        const {controles, total,  totalAguardandoCompra,totalAguardandoEntrega, totalCompraFinalizada} = await service.execute();
        const result = await service.execute();

        return res.json({
            result,
            controles,
            total,
            totalAguardandoCompra,
            totalAguardandoEntrega,
            totalCompraFinalizada,
        });
    }
}

export {ListSolicitacaodeComprasController}