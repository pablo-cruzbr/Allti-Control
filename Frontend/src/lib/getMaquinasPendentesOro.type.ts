export interface MaquinasPendentesOroProps{
    id: string;
    datadaInstalacao: string | null; 
    osInstalacao: string;
    osRetirada: string;
    
     equipamento:{
        id: string;
        name: string;
        patrimonio: string;
    };

    statusMaquinasPendentesOro:{
        id: string;
        name: string;
    }

     instituicaoUnidade: {
        id: string;
        name: string; 
        endereco: string;
    };

    created_at?: string; 

}

export interface MaquinasPendentesLabPropsResponse {
    controles: MaquinasPendentesOroProps[];
    total: number;
    totalAguardandoRetirada: number;
    totalDescartada: number;
    totalDisponivel: number;
    totalEmManutencao: number;
    totalInstalada: number;
}