'use client';

import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './cardListAssistenciaTecnica.module.scss';
import { FaRegTrashAlt } from 'react-icons/fa';
import { ModalContext } from '@/provider/AssistenciaTecnica';
import { useGlobalModal } from '@/provider/GlobalModalProvider';
import { AssistenciaTecnicaProps, AssistenciaTecnicaResponse } from '@/lib/getAssistenciaTecnica.type';
import { getCookieClient } from '@/lib/cookieClient';
import { api } from '@/services/api';
import { LuRefreshCcw } from "react-icons/lu";

interface Props {
  assistenciaData?: AssistenciaTecnicaResponse;
}

export default function AssistenciaTecnicaList({ assistenciaData }: Props) {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [searchOS, setSearchOS] = useState<string>(""); 
  const [searchAbertura, setSearchAbertura] = useState<string>("");

  const {
    controles = [],
    total = 0,
    totalAguardandoReparo = 0,
    totalFinalizado = 0,
  } = assistenciaData || {};

  const { openModal } = useGlobalModal();
  const { onRequestOpen } = useContext(ModalContext);
  const router = useRouter();

  const statusOption = [
    { id: "89ec0e9d-aa70-4b6d-beb9-9f32b47e6306", name: "AGUARDANDO REPARO" },
    { id: "ebbc599d-c986-4654-a4f9-4d21f265a88f", name: "REPARO FINALIZADO" },
  ];

const filteredControles = controles.filter(ticket => {
  const matchStatus = selectedStatus ? ticket.statusReparo.id === selectedStatus : true;
  const matchPatrimonio = searchOS ? ticket.equipamento?.patrimonio?.toString().includes(searchOS) : true;
  const matchAbertura = searchAbertura ? ticket.osDaAssistencia?.toString().includes(searchAbertura) : true;
  return matchStatus && matchPatrimonio && matchAbertura;
});


  async function handleDetailAssistencia(assistencia: AssistenciaTecnicaProps) {
    openModal('assistencia', [assistencia]);
  }

  function getStatusCliente(status: string | { name: string }): string {
    if (typeof status === 'string') return status;
    return status?.name || '-';
  }

  function handlerefresh() {
    router.refresh();
  }

  async function handleAddCardAssistenciaTecnica() {
    router.push('/dashboard/formulariosadd/formularioAssistenciaTecnica');
  }

  async function handleDeleteCardAssistenciaTecnica(controle_id: string) {
    try {
      const token = getCookieClient();
      await api.delete(`/controledeassistenciatecnica/${controle_id}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { controle_id },
      });
      router.refresh();
    } catch (error) {
      console.error('Erro ao deletar:', error);
    }
  }

  return (
    <section>
      <div className={styles.headerClient}>
        <h1 className={styles.titleClient}>Assistência Técnica</h1>
        <div className={styles.actions}>
          {/* SEARCH e SELECT STATUS */}
          <div className={styles.searchContainer}>
            <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Pesquisar por patrimônio / OS"
              value={searchOS}
              onChange={(e) => setSearchOS(e.target.value)}
              className={styles.searchInput}
            />
            <input
              type="text"
              placeholder="Pesquisar por OS de abertura"
              value={searchAbertura}
              onChange={(e) => setSearchAbertura(e.target.value)}
              className={styles.searchInput}
            />
            </div>
            <select
              className={styles.select}
              value={selectedStatus || ""}
              onChange={(e) => setSelectedStatus(e.target.value || null)}
            >
              <option value="">Todos os Status</option>
              {statusOption.map(status => (
                <option key={status.id} value={status.id}>{status.name}</option>
              ))}
            </select>
          </div>

          {/* Botão Novo Registro */}
          <button className={styles.button} onClick={handleAddCardAssistenciaTecnica}>
            Novo Registro
          </button>
          <LuRefreshCcw onClick={handlerefresh} className={styles.refresh}/>
        </div>
      </div>

      {/* CARDS DE CONTAGEM */}
      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <p className={styles.cardTitle}>Total</p>
          <strong className={styles.cardNumber}>{total}</strong>
        </div>
        <div className={styles.card}>
          <p className={styles.cardTitle}>Aguardando Reparo</p>
          <strong className={styles.cardNumber}>{totalAguardandoReparo}</strong>
        </div>
        <div className={styles.card}>
          <p className={styles.cardTitle}>Reparo Finalizado</p>
          <strong className={styles.cardNumber}>{totalFinalizado}</strong>
        </div>
      </div>

      {/* LISTA */}
      <div className={styles.listContainer}>
        {filteredControles.map((assistencia, index) => (
          <div
            key={assistencia.id}
            onClick={() => handleDetailAssistencia(assistencia)}
            className={styles.list}
          >
            <div className={styles.clientDetail}>
              <p className={`${styles.field} ${styles.name}`}>
                <strong>{index + 1} - Máquina:</strong> {assistencia.equipamento.name}
              </p>
              <p className={`${styles.field} ${styles.name}`}>
                <strong>Patrimônio:</strong> {assistencia.equipamento.patrimonio}
              </p>
              <p className={`${styles.field} ${styles.ticket}`}>
                <strong>Instituição Unidade:</strong> {assistencia.instituicaoUnidade.name}
              </p>
              <p className={`${styles.field} ${styles.tecnico}`}>
                <strong>Status:</strong> {getStatusCliente(assistencia.statusReparo.name)}
              </p>
              <p className={`${styles.field} ${styles.data}`}>
                <strong>Data:</strong>{' '}
                {assistencia.created_at
                  ? new Date(assistencia.created_at).toLocaleString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : 'Não informado'}
              </p>
              <FaRegTrashAlt
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteCardAssistenciaTecnica(assistencia.id);
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
