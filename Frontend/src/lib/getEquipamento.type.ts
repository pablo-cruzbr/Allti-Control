export interface EquipamentoProps{
    id: string;
    name: string;
    patrimonio: string;

      instituicaoUnidade: {
            id: string;
            name: string; 
            endereco: string;
        };

    created_at?: string; 
}