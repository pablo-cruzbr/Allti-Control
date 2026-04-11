import { Response, Request } from "express";
import { CreateInformacoesSetorService } from "../../../../services/status_categorias/Setor/InformacoesSetor/CreateInformacoesSetorService";
class CreateInformacoesSetorController {
    async handle(req: Request, res: Response){
        const {setorId, andar, ramal, usuario, clienteId, instituicaoUnidadeId} = req.body;

        const createInformacoesSetorService = new CreateInformacoesSetorService();

        const setor = await createInformacoesSetorService.execute({
            setorId,
            usuario,
            andar,
            ramal,
            clienteId,
            instituicaoUnidadeId


    });

        return res.json(setor);
    }
}

export {CreateInformacoesSetorController}