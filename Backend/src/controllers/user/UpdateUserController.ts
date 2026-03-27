import { Request, Response } from "express";
import { UpdateUserService } from "../../services/user/UpdateUSerService";

class UpdateUserController {
  async handle(req: Request, res: Response) {
    const { 
      user_id, 
      name, 
      email, 
      password, 
      cliente_id, 
      setor_id, 
      instituicaoUnidade_id 
    } = req.body;

    const updateUserService = new UpdateUserService();

    try {
      const user = await updateUserService.execute({
        user_id, 
        name,
        email,
        password,
        cliente_id,
        setor_id,
        instituicaoUnidade_id
      });

      return res.json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { UpdateUserController };