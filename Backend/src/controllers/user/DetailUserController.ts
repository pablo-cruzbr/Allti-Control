import { Request, Response } from "express";

import { DetailUserService } from "../../services/user/DetailUserService";

class DetailUserController {
    async handle(req: Request, res: Response) {
        //Pegou o id do usuário
        const user_id = req.user_id as string; 
 

        //Chamar o service
        const detailUserService = new DetailUserService();

        //Passar pro serviço o id do usuário
        const user = await detailUserService.execute(user_id)

        return res.json(user)
    }
}


export {DetailUserController}