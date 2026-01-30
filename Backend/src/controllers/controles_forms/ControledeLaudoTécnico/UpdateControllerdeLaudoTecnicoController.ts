import { Request, Response } from "express";
import { UpdateControledeLaudoTecnicoService } from "../../../services/controles_forms/ControledeLaudoTécnico/UpdateControledeLaudoTecnicoService";

class UpdateControllerdeLaudoTecnicoController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const {
      descricaodoProblema,
      mesAno,
      osLab,
      tecnico_id,
      instituicaoUnidade_id,
      equipamento_id,
    } = req.body;

    try {
      const service = new UpdateControledeLaudoTecnicoService ();
      const result = await service.execute({
        id,
        descricaodoProblema,
        mesAno,
        osLab,
        tecnico_id,
        instituicaoUnidade_id,
        equipamento_id,
      });
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { UpdateControllerdeLaudoTecnicoController };
