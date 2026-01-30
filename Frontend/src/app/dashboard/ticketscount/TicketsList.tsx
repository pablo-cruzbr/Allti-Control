'use client';

import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './ticketsLit.module.scss';
import { FaRegTrashAlt } from "react-icons/fa";
import { useGlobalModal } from '@/provider/GlobalModalProvider';
import { ModalContext } from '@/provider/compras';
import { OrdemdeServicoResponseData, OrdemdeServicoProps } from '@/lib/getOrdemdeServico.type';
import { getCookieClient } from '@/lib/cookieClient';
import { api } from '@/services/api';
import { LuRefreshCcw } from "react-icons/lu";
import Calendar from '../../components/calendar/calendar';

interface Props {
  ticketsData: OrdemdeServicoResponseData;
}

export default function TicketsList({ ticketsData }: Props) {

  useEffect(() => {
    console.log("TicketsData recebido:", ticketsData);
  }, [ticketsData]);

  const {
    total = 0,
    totalAberta = 0,
    totalEmAndamento = 0,
    totalConcluida = 0,
  } = ticketsData || {};

  const { controles } = ticketsData;

  const { openModal } = useGlobalModal();
  const { isOpen, onRequestOpen } = useContext(ModalContext);
  const router = useRouter();

  async function handleDetailOrdemdeServico(tecnico: OrdemdeServicoProps) {
    console.log("Abrindo modal para técnico:", tecnico);
    openModal('OrdemdeServico', [tecnico]);
  }

  function getStatusCliente(status: string | { name: string }): string {
    if (typeof status === 'string') return status;
    return status?.name ?? '-';
  }

  function handleAddCardTecnico() {
    console.log("Redirecionando para adicionar novo técnico");
    router.push('/AreadeUsuario/formularioAddTickets');
  }

  function handleListTickets(){
    router.push('/dashboard/tickets')
  }

  function handlerefresh() {
    console.log("Refresh da página acionado");
    router.refresh();
  }

  async function handleDeleteCardTecnico(tecnico_id: string) {
    try {
      const token = getCookieClient();
      console.log("Token recebido para delete:", token);
      console.log("ID do técnico a deletar:", tecnico_id);

      const response = await api.delete(`/removertecnico/${tecnico_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          tecnico_id,
        },
      });

      console.log("Resposta do delete:", response.data);
      console.log("Removido com sucesso:", tecnico_id);
      router.refresh();

    } catch (error) {
      console.error("Erro ao deletar técnico:", error);
    }
  }

  return (
    <>
      <div className={styles.headerClient}>
        <h1 className={styles.titleClient}> Dashboard</h1>

        <div className={styles.actions}>
          <button className={styles.button} onClick={handleAddCardTecnico}>
            Novo Registro
          </button>
          <button className={styles.button} onClick={handleListTickets}>
            Lista de Tickets
          </button>
          <LuRefreshCcw onClick={handlerefresh} className={styles.refresh} />
        </div>
      </div>

      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <p className={styles.cardTitle}>Total</p>
          <strong className={styles.cardNumber}>{total}</strong>
        </div>

        <div className={styles.card}>
          <p className={styles.cardTitle}>OS Aberta</p>
          <strong className={styles.cardNumber}>{totalAberta}</strong>
        </div>

        <div className={styles.card}>
          <p className={styles.cardTitle}>OS em Andamento</p>
          <strong className={styles.cardNumber}>{totalEmAndamento}</strong>
        </div>

        <div className={styles.card}>
          <p className={styles.cardTitle}>OS Concluida</p>
          <strong className={styles.cardNumber}>{totalConcluida}</strong>
        </div>

      </div>
   
      <div className={styles.headerClient}>
         <h1 className={styles.titleClient}>Calendário Técnico</h1>
      <Calendar/>
      </div>  
    </>

    
  );
}
