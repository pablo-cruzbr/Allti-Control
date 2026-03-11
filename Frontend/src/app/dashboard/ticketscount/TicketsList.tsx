'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { LuRefreshCcw } from "react-icons/lu";

import styles from './ticketsLit.module.scss';
import { OrdemdeServicoResponseData } from '@/lib/getOrdemdeServico.type';

// Importação dinâmica do calendário (mantendo ssr: false para evitar erros de hidratação)
const Calendar = dynamic(() => import('../../components/calendar/calendar'), { 
  ssr: false 
});

interface Props {
  ticketsData: OrdemdeServicoResponseData;
  tokenDoServidor?: string; 
}

/**
 * Nota: Removido 'async' e chamadas de 'next/headers', 
 * pois este é um Client Component.
 */
export default function TicketsList({ ticketsData, tokenDoServidor }: Props) {
  const router = useRouter();

  // Desestruturação segura dos dados recebidos via Props do Server Component
  const {
    total = 0,
    totalAberta = 0,
    totalEmAndamento = 0,
    totalConcluida = 0,
  } = ticketsData || {};

  // Funções de navegação e atualização
  const handleRefresh = () => router.refresh();
  const handleListTickets = () => router.push('/dashboard/tickets');
  const handleAddCard = () => router.push('/AreadeUsuario/formularioAddTickets');

  return (
    <>
      <div className={styles.headerClient}>
        <h1 className={styles.titleClient}>Dashboard Administrativo</h1>
        <div className={styles.actions}>
          <button className={styles.button} onClick={handleAddCard}>
            Novo Registro
          </button>
          <button className={styles.button} onClick={handleListTickets}>
            Lista de Tickets
          </button>
          <LuRefreshCcw onClick={handleRefresh} className={styles.refresh} />
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
          <p className={styles.cardTitle}>OS Concluída</p>
          <strong className={styles.cardNumber}>{totalConcluida}</strong>
        </div>
      </div>
   
      <div className={styles.headerClient} style={{ marginTop: '40px' }}>
        <h1 className={styles.titleClient}>Calendário Técnico</h1>
        {/* Passamos o token para o calendário realizar buscas no Client Side se necessário */}
        <Calendar initialToken={tokenDoServidor} />
      </div>
    </>
  );
}