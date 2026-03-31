export interface ClientesProps{
    id: string;
    name: string;
    endereco: string;
    telefone: string;
    cnpj: string;
    created_at: string;
}

export interface ClienteResponse {
    controles: ClientesProps[];
    total: number;
}