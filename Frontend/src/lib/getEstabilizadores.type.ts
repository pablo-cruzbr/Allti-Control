export interface EstabilizadoresProps{
        id:string;
        idChamado:string;
        problema:string;
        observacoes:string;
        osdaAssistencia:string;
        datadeChegada:string;
        datadeRetirada:string;
         
        estabilizadores:{
            id: string;
            name: string;
            patrimonio: string;
        };
    
        statusEstabilizadores:{
            id: string;
            name: string;
        };

         instituicaoUnidade: {
            id: string;
            name: string; 
            endereco: string;
        };

         created_at?: string; 
}

export interface EstabilizadoresResponse {
    controles: EstabilizadoresProps[];
    total: number;
    totalAguardandoReparo: number;
    totalFinalizado: number;
}