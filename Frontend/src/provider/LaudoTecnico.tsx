// '@/provider/LaudoTecnicoProvider.tsx'
'use client'

import { createContext, ReactNode, useContext, useState } from 'react';
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';

interface LaudoTecnicoItemProps {
  id: string;
  descricaodoProblema: string;
  mesAno: string;
  osLab: string;
  instituicaoUnidade: {
    name: string;
    endereco: string;
  };
  equipamento: {
    name: string;
    patrimonio: string;
  };
  tecnico: {
    name: string;
  };
  created_at?: string;
}

type LaudoTecnicoContextData = {
  isOpen: boolean;
  openLaudoModal: (id: string) => Promise<void>;
  closeLaudoModal: () => void;
  laudoTecnico: LaudoTecnicoItemProps[];
};

type LaudoTecnicoProviderProps = {
  children: ReactNode;
};

const LaudoTecnicoContext = createContext({} as LaudoTecnicoContextData);

export const useLaudoTecnicoModal = () => useContext(LaudoTecnicoContext);

export function LaudoTecnicoProvider({ children }: LaudoTecnicoProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [laudoTecnico, setLaudoTecnico] = useState<LaudoTecnicoItemProps[]>([]);

  async function openLaudoModal(id: string) {
    try {
      const token = getCookieClient();
      const response = await api.get('/controledelaudotecnico/detail', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          controle_id: id,
        },
      });

      console.log(response.data); 
      setLaudoTecnico([response.data]);
      setIsOpen(true);
    } catch (error) {
      console.error('Erro ao buscar o laudo técnico:', error);
    }
  }

  function closeLaudoModal() {
    setIsOpen(false);
    setLaudoTecnico([]);
  }

  return (
    <LaudoTecnicoContext.Provider
      value={{
        isOpen,
        openLaudoModal,
        closeLaudoModal,
        laudoTecnico,
      }}
    >
      {children}
    </LaudoTecnicoContext.Provider>
  );
}
