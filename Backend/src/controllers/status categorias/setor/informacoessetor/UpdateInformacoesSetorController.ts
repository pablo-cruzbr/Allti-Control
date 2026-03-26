import { Response, Request } from "express";
import { UpdateInformacoesSetorService } from "../../../../services/status_categorias/Setor/InformacoesSetor/UpdateInformacoesSetorService";

class UpdateInformacoesSetorController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;

        const { 
            setorId, 
            andar, 
            ramal, 
            usuario, 
            clienteId, 
            instituicaoUnidadeId 
        } = req.body;

        const updateInformacoesSetorService = new UpdateInformacoesSetorService();

        try {
            const setorInfo = await updateInformacoesSetorService.execute({
                id, 
                setorId,
                usuario,
                andar,
                ramal,
                clienteId,
                instituicaoUnidadeId
            });

            return res.json(setorInfo);
            
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { UpdateInformacoesSetorController };