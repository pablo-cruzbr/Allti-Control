'use client'

import {createContext, ReactNode, useState} from 'react';
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';

interface AssistenciaTecnicaItemProps{
    id: string;
    name: string;
    mesAno: string;
    idChamado: string;
    assistencia: string;
    observacoes: string;
    osDaAssistencia: string;
    dataDeRetirada: string;
     
    equipamento:{
        name: string;
        patrimonio: string;
    }

    statusReparo: {
    name: string;
   };

   instituicaoUnidade: {
        name: string;
        endereco: string;
  };

    tecnico:{
        name: string;
    }

    cliente:{
        name: string;
    }
    
    created_at?: string; 

}

type ModalContextData = {
    isOpen: boolean;
    onRequestOpen: (assistenciaTecnica_id?: string) => Promise<void>;
    onRequestClose: () => void;
    assistencia: AssistenciaTecnicaItemProps[];
}


type ModalProviderProps = {
    children: ReactNode;
}

export const ModalContext = createContext({} as ModalContextData)


export function ModalProvider({children}: ModalProviderProps){
    const [isOpen, setIsOpen] = useState(false);
    const [assistencia, setAssistencia] = useState<AssistenciaTecnicaItemProps[]>([])
    async function onRequestOpen(controle_id?: string) {
  if (!controle_id) return;

  const token = getCookieClient();

  const response = await api.get("/controledelaudotecnico/detail", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      controle_id: controle_id,
    },
  });

  setAssistencia([response.data]);
  setIsOpen(true);
}


    function onRequestClose(){
        setIsOpen(false);
    }

    return(
        <ModalContext.Provider
            value={{
                isOpen,
                onRequestOpen,
                onRequestClose,
                assistencia
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}