export interface Setor {
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

export interface OrdemdeServicoProps {
  id: string;
  name: string;
  descricaodoProblemaouSolicitacao: string;
  nomedoContatoaserProcuradonoLocal?: string;
  tipodeChamado_id: string;
  tipodeOrdemdeServico_id: string;
  cliente_id?: string;
  tecnico_id?: string;
  statusOrdemdeServico_id?: string;
  numeroOS: number;
  assinante: string | null;

  startedAt?: string | null;
  endedAt?: string | null;
  duracao?: number;

  instituicaoUnidade_id?: string;
  user_id: string;

  nameTecnico?: string;
  diagnostico?: string;
  solucao?: string;
  bannerassinatura?: string;

  created_at: string;
  update_at: string;

  fotos?: {
    id: string;
    url: string;
  }[];

  cliente?: {
    id: string;
    name: string;
    endereco?: string;
  };

   equipamento?: {
    id: string;
    name: string;
    patrimonio?: string;
  };

  tecnico?: {
    id: string;
    name: string;
  };

  statusOrdemdeServico?: {
    id: string;
    name: string;
  };

  tipodeChamado: {
    id: string;
    name: string;
  };
  
  tipodeOrdemdeServico: {
    id: string;
    name: string;
  };

  instituicaoUnidade?: {
    id: string;
    name: string;
    endereco?: string;
  };

  user: {
    id: string;
    name: string;
    email: string;
    cliente?: {
      id: string;
      name: string;
      endereco?: string;
    };
    setor?: {
      id: string;
      name: string;
    };
    instituicaoUnidade?: {
      id: string;
      name: string;
      endereco?: string;
    };
  };

  informacoesSetor?: Setor | null; 
}


export interface OrdemdeServicoResponseData{
    controles: OrdemdeServicoProps[];
    total: number;
    totalAberta: number;
    totalEmAndamento: number;
    totalConcluida: number;
    totalPausada: number;
    totalTicket: number;
    totalOrdemdeServico: number

}