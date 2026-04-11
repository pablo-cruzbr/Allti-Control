import { Request, Response } from 'express';
import { UpdateEquipamentoService } from '../../../services/status_categorias/Equipamento/UpdateEquipamentoService';

class UpdateEquipamentoController {
  async handle(req: Request, res: Response) {
    const { id, name, patrimonio, instituicaoUnidade_id } = req.body;
    const updateEquipamentoService = new UpdateEquipamentoService();

    try {
      const equipamento = await updateEquipamentoService.execute({
        id,
        name,
        patrimonio,
        instituicaoUnidade_id
      });

      return res.json(equipamento);

    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { UpdateEquipamentoController };