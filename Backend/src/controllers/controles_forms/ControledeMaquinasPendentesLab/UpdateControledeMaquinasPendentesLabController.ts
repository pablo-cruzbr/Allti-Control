import { Request, Response } from "express";
import { UpdateControledeMaquinasPendentesLabService } from "../../../services/controles_forms/ControledeMaquinasPendentesLab/UpdateControledeMaquinasPendentesLabService";

class UpdateControledeMaquinasPendentesLabController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const {
      numeroDeSerie,
      ssd,
      idDaOs,
      obs,
      equipamento_id,
      statusMaquinasPendentesLab_id,
      instituicaoUnidade_id,
    } = req.body;

    try {
      const service = new UpdateControledeMaquinasPendentesLabService();
      const result = await service.execute({
        id,
        numeroDeSerie,
        ssd,
        idDaOs,
        obs,
        equipamento_id,
        statusMaquinasPendentesLab_id,
        instituicaoUnidade_id,
      });
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { UpdateControledeMaquinasPendentesLabController };
