export interface MaquinasPendentesLabProps {
    id: string;
    numeroDeSerie: string;
    ssd: string;
    idDaOs: string;
    obs: string;
    osLab: string; // antes era idDaOs

    //STATUS
    statusMaquinasPendentesLab:{
        id: string;
        name: string;
    }

     instituicaoUnidade: {
        id: string;
        name: string; 
        endereco: string;
    };
    
     equipamento:{
        id: string;
        name: string;
        patrimonio: string;
    };

    created_at: string; 
}

export interface MaquinasPendentesLabResponse {
    controles: MaquinasPendentesLabProps[];
    total: number;
    totalPendenteOro: number;
    totalSubstituta: number;
}