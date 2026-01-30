import prismaClient from "../../../prisma";

interface ControledeMPLRequest{
    numeroDeSerie: string;
    ssd: string;
    idDaOs: string;
    obs: string;

    equipamento_id: string;
    statusMaquinasPendentesLab_id: string;
    instituicaoUnidade_id: string;
}

class CreateControledeMaquinasPendentesLabService{
    async execute({
        numeroDeSerie,
        ssd,
        idDaOs,
        obs,
        equipamento_id,
        statusMaquinasPendentesLab_id,
        instituicaoUnidade_id
    }: ControledeMPLRequest){
        if(!numeroDeSerie || numeroDeSerie.trim() === " " ){
            throw new Error ("Insira o numero de serie!")
        }

        const controle = await prismaClient.controleDeMaquinasPendentesLaboratorio.create({
            data:{
                numeroDeSerie,
                ssd,
                idDaOs,
                obs,
                
                equipamento_id,
                statusMaquinasPendentesLab_id,
                instituicaoUnidade_id
            },
            include:{
                equipamento:{
                    select:{
                        name: true,
                        patrimonio: true,
                    }
                },
                statusMaquinasPendentesLab:{
                    select:{name: true}
                },
                instituicaoUnidade:{
                    select:{
                        name: true,
                        endereco: true
                    }
                }
            }
        })
        return controle;
    }
}

export {CreateControledeMaquinasPendentesLabService}