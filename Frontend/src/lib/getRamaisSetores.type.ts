export interface RamaisSetoresProps{
   id: string;
  usuario: string;
  ramal: string;
  andar: string;
  setor: {
    id: string;
    name: string;
  };
    instituicaoUnidade?: {
      id: string;
      name: string;
      endereco?: string;
    };
    cliente?: {
    id: string;
    name: string;
    endereco?: string;
  };

}

