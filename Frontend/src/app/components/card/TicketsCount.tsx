'use client';

import React from 'react';
import styles from './ticketsList.module.scss';
import { OrdemdeServicoResponseData } from '@/lib/getOrdemdeServico.type';

interface TicketsCountProps {
  ticketsData: OrdemdeServicoResponseData;
}

export default function TicketsCount({ ticketsData }: TicketsCountProps) {
  const {
    total = 0,
    totalAberta = 0,
    totalEmAndamento = 0,
    totalConcluida = 0,
  } = ticketsData || {};

  return (
    <div className={styles.cardsContainer}>
      <div className={styles.card}>
        <p className={styles.cardTitle}>TESTE </p>
        
      </div>
    </div>
  );
}
