export interface ClientesMunicipaisProps{
    id: string;
    name: string;
    endereco: string;
    created_at: string;   

    tipodeinstituicaoUnidade: {
        id: string;
        name: string;
  };
}

export interface ClienteMunicipaisResponse {
    controles: ClientesMunicipaisProps[];
    total: number;
}