import { Response, Request } from "express";
import { CreateSolicitacaodeComprasService} from "../../../services/controles_forms/SolicitacaodeCompras/CreateSolicitacaodeComprasService";

class CreateSolicitacaodeComprasController{
    async handle(req: Request, res: Response) {
        const {
            itemSolicitado,
            solicitante,
            motivoDaSolicitacao,
            preco,
            linkDeCompra,
            statusCompras_id
        } = req.body

        const createSolicitacaodeComprasService = new CreateSolicitacaodeComprasService();

        const controle = await createSolicitacaodeComprasService.execute({
            itemSolicitado,
            solicitante,
            motivoDaSolicitacao,
            preco,
            linkDeCompra,
            statusCompras_id
        });

        return res.json(controle);
    }
}

export { CreateSolicitacaodeComprasController};
