import { Response, Request } from "express";
import { CreateControledeMaquinasPendentesOroService } from "../../../services/controles_forms/ControledeMaquinasPendentesOro/CreateControledeMaquinasPendentesOroService";

class CreateControledeMaquinasPendentesOroController{
    async handle(req: Request, res: Response) {
        const {
             datadaInstalacao,
             osInstalacao,
             osRetirada,
             equipamento_id,
             statusMaquinasPendentesOro_id,
             instituicaoUnidade_id
        } = req.body

        const createControledeMaquinasPendentesOroService = new CreateControledeMaquinasPendentesOroService();

        const controle = await createControledeMaquinasPendentesOroService.execute({
            datadaInstalacao,
             osInstalacao,
             osRetirada,
             equipamento_id,
             statusMaquinasPendentesOro_id,
             instituicaoUnidade_id, 
        });

        return res.json(controle);
    }
}

export { CreateControledeMaquinasPendentesOroController};
