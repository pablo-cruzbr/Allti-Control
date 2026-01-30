'use client'

import {createContext, ReactNode, useState} from 'react';
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';

interface ComprasItemProps{
    id: string;
    itemSolicitado: string;
    solicitante: string;
    motivoDaSolicitacao: string;
    preco: number | string;
    linkDeCompra: string;
    statusCompras?: { name: string } | string | null;
    created_at?: string;
}

type ModalContextData = {
    isOpen: boolean;
    onRequestOpen: (compra_id?: string) => Promise<void>;
    onRequestClose: () => void;
    compras: ComprasItemProps[];
}

type ModalProviderProps = {
    children: ReactNode;
}

export const ModalContext = createContext({} as ModalContextData)

export function ModalProvider({children} : ModalProviderProps){
    const [isOpen, setIsOpen] = useState(false);
    const [compras, setCompras] = useState<ComprasItemProps[]>([])
    async function onRequestOpen(compra_id?: string) {
        const token = getCookieClient();
        const response = await api.get("/compra/detail", {
            headers: {
            Authorization: `Bearer ${token}`,
            },
            params: {
            compra_id: compra_id,
            },
        });
        console.log("ID recebido para abrir modal:", compra_id);
        console.log(response.data);
        setCompras([response.data]);
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
                compras
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}


