import { Request, Response } from "express";
import { ListControledeMaquinasPendentesOroService } from "../../../services/controles_forms/ControledeMaquinasPendentesOro/ListControledeMaquinasPendentesOroService";
class ListControledeMaquinasPendentesOroController{
    async handle(req: Request, res: Response){
        const service = new ListControledeMaquinasPendentesOroService ();
        const {
            controles, 
            total, 
            totalAguardandoRetirada, 
            totalDescartada, 
            totalDisponivel, 
            totalEmManutencao, 
            totalInstalada} = await service.execute();
        const result = await service.execute();

        return res.json({
            result,
            controles,
            total,
            totalAguardandoRetirada,
            totalDescartada,
            totalDisponivel,
            totalEmManutencao,
            totalInstalada
        });
    }
}

export {ListControledeMaquinasPendentesOroController}