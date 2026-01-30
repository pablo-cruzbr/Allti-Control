export interface LaboratorioProps{
    id: string;
    nomedoEquipamento: string;
    marca: string;
    defeito: string;
    osDeAbertura: string;
    osDeDevolucao: string;
    data_de_Chegada: string;
    data_de_Finalizacao: string;

    //STATUS
    statusControledeLaboratorio: {
        id: string;
        name: string;
   };

     instituicaoUnidade: {
        id: string;
        name: string; 
        endereco: string;
    };

    cliente:{
        id: string;
        name: string;
    }

     equipamento:{
        id: string;
        name: string;
        patrimonio: string;
    };
    
    tecnico:{
        id: string;
        name: string;
    }

    created_at?: string; 
}

export interface LaboratorioResponse {
    controles: LaboratorioProps[];
    total: number;
    totalAguardandoConserto: number;
    totalAguardandoDevolucao: number;
    totalAguardandoOSdeLaboratorio: number;

}