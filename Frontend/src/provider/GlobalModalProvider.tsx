'use client'

import { ReactNode, createContext, useContext, useState } from 'react';

// Tipos de Modal suportados
export type ModalType =
  | 'laudotecnico'
  | 'assistencia'
  | 'compras'
  | 'usuarios'
  | 'equipamentos'
  | 'laboratorio'
  | 'maquinasPendentesLab'
  | 'maquinasPendentesOro'
  | 'documentacaoTecnica'
  | 'tickets'
  | 'OrdemdeServico'
  | 'Estabilizadores'
  | null;

interface ModalContextProps {
  openModal: (type: ModalType, data?: any) => void;
  closeModal: () => void;
  modalType: ModalType;
  modalData: any;
  isOpen: boolean;
}

const ModalContext = createContext({} as ModalContextProps);

export const useGlobalModal = () => useContext(ModalContext);

export function GlobalModalProvider({ children }: { children: ReactNode }) {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalData, setModalData] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (type: ModalType, data?: any) => {
    setModalType(type);
    setModalData(data ?? null);
    setIsOpen(true);
  };

  const closeModal = () => {
    setModalType(null);
    setModalData(null);
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        modalType,
        modalData,
        isOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
