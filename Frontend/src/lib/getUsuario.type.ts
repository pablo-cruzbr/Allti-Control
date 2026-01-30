export interface UsuariosProps{
    id: string;
    name: string;
    email: string;
    created_at: string;

    instituicaoUnidade: {
        id: string;
        name: string; 
        endereco: string;
    };

    cliente: {
        id: string;
        name: string;
        endereco: string;
    };
    setor:{
        id: string;
        name: string
    };
    tecnico:{
        id: string;
        name: string
    }
}

export interface UsuariosPropsResponse {
    controles: UsuariosProps[];
    total: number;
}