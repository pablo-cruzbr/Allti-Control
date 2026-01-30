export interface TecnicosProps{
    id: string;
    name: string; 

    created_at: string;
}

export interface TecnicoPropsResponse{
    controles: TecnicosProps[];
    total: number;
}