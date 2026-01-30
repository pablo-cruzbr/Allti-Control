import { Request, Response } from "express";
import { UpdateControledeMaquinasPendentesOroService } from "../../../services/controles_forms/ControledeMaquinasPendentesOro/UpdateControledeMaquinasPendentesOroService";
class UpdateControledeMaquinasPendentesOroController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const {
        datadaInstalacao,
        osInstalacao,
        osRetirada,
        equipamento_id,
        statusMaquinasPendentesOro_id,
        instituicaoUnidade_id, 
    } = req.body;

    try {
      const service = new UpdateControledeMaquinasPendentesOroService();
      const result = await service.execute({
        id,
        datadaInstalacao,
        osInstalacao,
        osRetirada,
        equipamento_id,
        statusMaquinasPendentesOro_id,
        instituicaoUnidade_id, 
      });
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { UpdateControledeMaquinasPendentesOroController };
