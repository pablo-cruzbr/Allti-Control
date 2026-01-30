export interface AssistenciaTecnicaProps{
    id: string;
    name: string;
    mesAno: string;
    idChamado: string;
    assistencia: string;
    observacoes: string;
    osDaAssistencia: string;
    dataDeRetirada: string;
     
    equipamento:{
        id: string;
        name: string;
        patrimonio: string;
    }

    statusReparo: {
        id: string;
        name: string;
   };

   instituicaoUnidade: {
        id: string;
        name: string;
        endereco: string;
  };

    tecnico:{
        name: string;
        id: string;
    };

    cliente:{
        id: string;
        name: string;
    };
    
    created_at?: string; 
}

export interface AssistenciaTecnicaResponse {
    controles: AssistenciaTecnicaProps[];
    total: number;
    totalAguardandoReparo: number;
    totalFinalizado: number;
}

