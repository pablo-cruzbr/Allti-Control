import { Response, Request } from "express";
import { ListInformacoesSetorService } from "../../../../services/status_categorias/Setor/InformacoesSetor/ListInformacoesSetorService";

class ListInformacaoesSetoresController {
    async handle (req: Request, res: Response){
        const listInformacoesSetorService = new ListInformacoesSetorService();

        const setor = await listInformacoesSetorService.execute();

        return res.json(setor)
    }
}

export {ListInformacaoesSetoresController}