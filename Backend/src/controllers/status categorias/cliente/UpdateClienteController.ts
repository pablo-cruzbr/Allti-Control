import { Response, Request } from "express";
import { UpdateClienteService } from "../../../services/status_categorias/Cliente/UpdateClienteService";

class UpdateClienteController {
    async handle(req: Request, res: Response) {
        const id = req.query.id as string; 
        
        const { name, endereco, cnpj } = req.body;

        const updateClienteService = new UpdateClienteService();

        const cliente = await updateClienteService.execute({
            id,
            name,
            endereco,
            cnpj
        });

        return res.json(cliente);
    }
}

export { UpdateClienteController };