import { Response, Request } from "express";
import { CreateControledeMaquinasPendentesLabService } from "../../../services/controles_forms/ControledeMaquinasPendentesLab/CreateControledeMaquinasPendentesLabService";

class CreateControledeMaquinasPendentesLabController {
    async handle(req: Request, res: Response) {
        const {
            numeroDeSerie,
            ssd,
            idDaOs,
            obs,
            equipamento_id,
            statusMaquinasPendentesLab_id,
            instituicaoUnidade_id
        } = req.body;

        const createControledeMaquinasPendentesLabService = new CreateControledeMaquinasPendentesLabService();

        const controle = await createControledeMaquinasPendentesLabService.execute({
            numeroDeSerie,
            ssd,
            idDaOs,
            obs,
            equipamento_id,
            statusMaquinasPendentesLab_id,
            instituicaoUnidade_id
        });

        return res.json(controle);
    }
}

export { CreateControledeMaquinasPendentesLabController };
