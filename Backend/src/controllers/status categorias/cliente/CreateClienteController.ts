import { Response, Request } from "express";
import { CreateClienteService } from "../../../services/status_categorias/Cliente/CreateClienteService";

class CreateClienteController {
    async handle(req: Request, res: Response){
        const { name, endereco, cnpj } = req.body;

        const createClienteService = new CreateClienteService();

        const cliente = await createClienteService.execute({
            name,
            endereco,
            cnpj
        });

        return res.json(cliente);
    }
}

export { CreateClienteController };
