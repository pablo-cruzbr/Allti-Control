// src/app/AreadeUsuario/formularioAddTickets/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';
import styles from '../logindeUsuario.module.scss';
import { FaClipboardList } from 'react-icons/fa';
import { redirect } from "next/navigation";

interface TipoDeChamado {
  id: string;
  name: string;
}


export default function formularioenviado() {
  const router = useRouter();

  function handleRedirect() {
    router.push('/AreadeUsuario/formularioAddTickets');
  }

  return (
    <div className={styles.container}>
      <div className={styles.formsContainer}>
        <div className={styles.signinSignup}>
        <form className={styles.signInForm}>
        <h4 className={styles.title}>Voltar para tela de Abertura de Chamados</h4>
        <button type='button' className={`${styles.btn} ${styles.solid}`} 
        onClick={handleRedirect}>
             Clique Aqui !
            </button>
          </form>
        </div>
      </div>

      <div className={styles.panelsContainer}>
        <div className={`${styles.panel} ${styles.leftPanel}`}>
          <div className={styles.content}>
            <h3>Chamado enviado com sucesso! ✅</h3>
            <p>Recebemos sua solicitação e em breve entraremos em contato para o atendimento. Obrigado!</p>
          </div>
        </div>
      </div>
    </div>
  
  );
}
