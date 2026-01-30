'use client';

import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from './cardListTecnico.module.scss';
import { FaRegTrashAlt } from "react-icons/fa";
import { useGlobalModal } from '@/provider/GlobalModalProvider';
import { ModalContext } from '@/provider/compras';
import { TecnicosProps, TecnicoPropsResponse } from '@/lib/getTecnicos.type';
import { getCookieClient } from '@/lib/cookieClient';
import { api } from '@/services/api';
import { LuRefreshCcw } from "react-icons/lu";

interface Props {
  tecnicosData: TecnicoPropsResponse;
}

export default function TecnicoList({ tecnicosData }: Props) {
  const {
  controles = [],
  total = 0,
} = tecnicosData || { controles: [], total: 0 };

  const { openModal } = useGlobalModal();
  const { isOpen, onRequestOpen } = useContext(ModalContext);
  const router = useRouter(); 

   async function handleDetailMaquinasPendentesOro(Tecnicos: TecnicosProps) {
      openModal('maquinasPendentesOro', [Tecnicos]);
    }

  function getStatusCliente(status: string | { name: string | string }): string {
  if (typeof status === 'string') {
    return status;
  }

  // Verifica se name existe e é uma string
  if (status && typeof status.name === 'string') {
    return status.name;
  }

  return '-';
}
  
  async function handleAddCardTecnico(){
    //alert('TESTE!!!!')
    router.push('/dashboard/formulariosadd/formularioTecnicoAdd');
  }

  
  function handlerefresh(){
    router.refresh();
  }

  async function handleDeleteCardTecnico(tecnico_id: string) {
    try {
      const token = getCookieClient();

      await api.delete(`/removertecnico/${tecnico_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          tecnico_id,
        },
      });

      console.log("Removido com sucesso:", tecnico_id);
      router.refresh(); //Atualiza a Pagina logo após apagar o card.

    } catch (error) {
      console.error("Erro ao deletar a compra:", error);
    }
  }

  return (
    <section>
    <div className={styles.headerClient}>
        <h1 className={styles.titleClient}>Técnicos Cadastrados</h1>

        <div className={styles.actions}>
            <button className={styles.button}
            onClick={handleAddCardTecnico}
            >Novo Registro</button>
            <LuRefreshCcw onClick={handlerefresh} className={styles.refresh}/>
        </div>
    </div>

    <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <p className={styles.cardTitle}>Total</p>
          <strong className={styles.cardNumber}>{total}</strong>
        </div>
      </div>

      <div className={styles.listContainer}> 
      {controles.map((tecnico,index) => (
    <div
        key={tecnico.id}
        onClick={() => handleDetailMaquinasPendentesOro(tecnico)}
        className={styles.list}
  >
    <div className={styles.clientDetail}>
      <p className={`${styles.field} ${styles.name}`}>
        <strong>Nome: </strong>{tecnico.name}
      </p>
      <p className={`${styles.field} ${styles.data}`}>
                <strong></strong>{" "}
                      {tecnico.created_at
                  ? new Date(tecnico.created_at).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </p>
      <FaRegTrashAlt
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteCardTecnico(tecnico.id)
    
        }}
        className={styles.iconTrash}
      />
    </div>
  </div>
))}
      </div>
     
    </section>
  );
}
