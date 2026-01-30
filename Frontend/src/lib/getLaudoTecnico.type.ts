export interface LaudoTecnicoProps{
    id: string;
    descricaodoProblema: string;
    mesAno: string;
    osLab: string;
    
    //SEM STATUS 

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

    tecnico:{
        id: string;
        name: string;
    };

    created_at?: string; 
}