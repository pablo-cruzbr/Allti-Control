import { Request, Response } from "express";
import { RemoveClienteService } from "../../../services/status_categorias/Cliente/RemoveClienteService";

class RemoveClienteController{
    async handle(req: Request, res: Response){
        const cliente_id = req.query.cliente_id as string;

        const removeClienteService = new RemoveClienteService();

        const cliente = await removeClienteService.execute({
            cliente_id
        })

        return res.json(cliente);
    }
}


export {RemoveClienteController}