export interface DocumentacaoTecnicaProps{
    id: string;
    titulo: string;
    descricao: string;
    
    created_at: string;

     instituicaoUnidade: {
        id: string;
        name: string; 
        endereco: string;
    };
    cliente:{
        id: string;
        name: string;
    };
    tecnico:{
        id: string;
        name: string;
    }
}