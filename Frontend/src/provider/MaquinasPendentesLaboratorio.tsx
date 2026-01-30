// '@/provider/LaboratorioProvider.tsx'
'use client'

import { createContext, ReactNode, useContext, useState } from 'react';
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';

interface LaboratorioItemProps {
    id: string;
    nomedoEquipamento: string;
    marca: string;
    defeito: string;
    osDeAbertura: string;
    osDeDevolucao: string;
    data_de_Chegada: string;
    data_de_Finalizacao: string;

    //STATUS
    statusControledeLaboratorio: {
    name: string;
   };

     instituicaoUnidade: {
        name: string; 
        endereco: string;
    };

    cliente:{
        name: string;
    }

     equipamento:{
        name: string;
        patrimonio: string;
    };

    created_at?: string; 
}

type LaboratorioContextData = {
  isOpen: boolean;
  onRequestOpen: (laboratorio_id: string) => Promise<void>;
  onRequestClose: () => void;
  laboratorio: LaboratorioItemProps[];
};

type LaboratorioProviderProps = {
  children: ReactNode;
};

const LaboratorioContext = createContext({} as LaboratorioContextData);

export const useLaboratorioModal = () => useContext(LaboratorioContext);

export function LaboratorioProvider({ children }: LaboratorioProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [laboratorio, setLaboratorio] = useState<LaboratorioItemProps[]>([]);

  async function onRequestOpen(id: string) {
    try {
      const token = getCookieClient();
      const response = await api.get('/controledemaquinaspendenteslab/detail', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          controle_id: id,
        },
      });

      console.log(response.data); 
      setLaboratorio([response.data]);
      setIsOpen(true);
    } catch (error) {
      console.error('Erro ao buscar o laudo técnico:', error);
    }
  }

  function  onRequestClose() {
    setIsOpen(false);
    setLaboratorio([]);
  }

  return (
    <LaboratorioContext.Provider
      value={{
        isOpen,
         onRequestOpen,
         onRequestClose,
        laboratorio,
      }}
    >
      {children}
    </LaboratorioContext.Provider>
  );
}
