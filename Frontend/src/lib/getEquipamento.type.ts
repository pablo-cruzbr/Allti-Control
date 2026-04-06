export interface EquipamentoProps{
    id: string;
    name: string;
    patrimonio: string;

    instituicaoUnidade: {
        id: string;
        name: string; 
        endereco: string;
    };

        tipodeEquipamento: {
        select: {
            id: true,
            name: true
        }
    }

    created_at?: string; 
}