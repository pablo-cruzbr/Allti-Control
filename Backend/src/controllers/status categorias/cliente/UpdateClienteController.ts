import { Response, Request } from "express";
import { UpdateClienteService } from "../../../services/status_categorias/Cliente/UpdateClienteService";

class UpdateClienteController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;   
        const { name, endereco, cnpj } = req.body;
        const updateClienteService = new UpdateClienteService();

        const cliente = await updateClienteService.execute({
            id: id as string,
            name,
            endereco,
            cnpj
        });

        return res.json(cliente);
    }
}

export { UpdateClienteController };