import { Response, Request } from "express";
import { CreateControledeLaudoTecnicoService } from "../../../services/controles_forms/ControledeLaudoTécnico/CreateControledeLaudoTécnicoService";

class CreateControledeLaudoTecnicoController{
    async handle(req: Request, res:Response){
        const {
            descricaodoProblema,
            mesAno,
            osLab,
            instituicaoUnidade_id,
            equipamento_id,
            tecnico_id,

        } = req.body;
        const createControledeLaudoTecnicoService = new CreateControledeLaudoTecnicoService;

        const controle = await createControledeLaudoTecnicoService.execute({
            descricaodoProblema,
            mesAno: new Date(mesAno),
            osLab,
            instituicaoUnidade_id,
            equipamento_id,
            tecnico_id,
        })
        return res.json(controle);
    }
}

export {CreateControledeLaudoTecnicoController}