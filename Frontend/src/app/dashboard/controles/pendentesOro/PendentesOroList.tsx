'use client';

import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './cardListPendentesOro.module.scss';
import { FaRegTrashAlt } from "react-icons/fa";
import { useGlobalModal } from '@/provider/GlobalModalProvider';
import { ModalContext } from '@/provider/compras';
import { MaquinasPendentesOroProps, MaquinasPendentesLabPropsResponse } from '@/lib/getMaquinasPendentesOro.type';
import { getCookieClient } from '@/lib/cookieClient';
import { api } from '@/services/api';
import { LuRefreshCcw } from "react-icons/lu";

interface Props {
  MaquinasPendentesLabPropsData: MaquinasPendentesLabPropsResponse;
}

export default function PendentesOroList({ MaquinasPendentesLabPropsData }: Props) {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [searchOS, setSearchOS] = useState<string>("");

  const {
    controles = [],
    total = 0,
    totalAguardandoRetirada = 0,
    totalDescartada = 0,
    totalDisponivel = 0,
    totalEmManutencao = 0,
    totalInstalada = 0,
  } = MaquinasPendentesLabPropsData || {}

  const statusOption = [
    { id: "98ad261f-0d0e-4d70-817a-93b334dd67e1", name: "DISPONIVEL" },
    { id: "b0b646f4-8cec-4e78-a3be-e9eb7018101d", name: "INSTALADA" },
    { id: "cc32a343-b448-4d36-b730-0847f4336fbd", name: "AGUARDANDO RETIRADA" },
    { id: "16ac1988-b986-450c-8744-2868d126144c", name: "EM MANUTENÇÃO" },
    { id: "87be29c3-9e0a-498e-b6b4-bf390a90ef11", name: "RESERVADA" },
    { id: "08e8c64f-cf0e-47a5-b13c-1c97e0a8a93c", name: "DESCARTADA" },
  ];

const filteredControles = controles.filter((maquina) => {
  const searchLower = searchOS.toLowerCase();
  const patrimonio = maquina.equipamento?.patrimonio ?? "";
  const osInstalacao = maquina.osInstalacao ?? "";
  const osRetirada = maquina.osRetirada ?? "";

  const matchesSearch = searchLower
    ? patrimonio.toLowerCase().includes(searchLower) ||
      osInstalacao.toLowerCase().includes(searchLower) ||
      osRetirada.toLowerCase().includes(searchLower)
    : true;

  const matchesStatus = selectedStatus
    ? maquina.statusMaquinasPendentesOro?.id === selectedStatus
    : true;

  return matchesSearch && matchesStatus;
});

  const { openModal } = useGlobalModal();
  const { isOpen, onRequestOpen } = useContext(ModalContext);
  const router = useRouter();

  async function handleDetailMaquinasPendentesOro(maquinasOro: MaquinasPendentesOroProps) {
    openModal('maquinasPendentesOro', [maquinasOro]);
  }

  function handlerefresh() {
    router.refresh();
  }

  async function handleAddCardPendentesOro() {
    router.push('/dashboard/formulariosadd/formularioPendentesOro');
  }

  async function handleDeleteCardPendentesOro(controle_id: string) {
    try {
      const token = getCookieClient();

      await api.delete(`/deletecontroledemaquinaspendentesoro/${controle_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          controle_id,
        },
      });

      console.log("Removido com sucesso:", controle_id);
      router.refresh();
    } catch (error) {
      console.error("Erro ao deletar a compra:", error);
    }
  }

  return (
    <section>
      <div className={styles.headerClient}>
        <h1 className={styles.titleClient}>Controle de Maquinas Pendentes Oro</h1>

      <div className={styles.actions}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Pesquisar por patrimônio ou OS..."
            value={searchOS}
            onChange={(e) => setSearchOS(e.target.value)}
            className={styles.searchInput}
          />

      <select
        className={styles.select}
        value={selectedStatus ?? ""}
        onChange={(e) => setSelectedStatus(e.target.value || null)}
      >
        <option value="">Todos os Status</option>
        {statusOption.map((status) => (
          <option key={status.id} value={status.id}>{status.name}</option>
        ))}
      </select>
    </div>

    <button className={styles.button} onClick={handleAddCardPendentesOro}>
      Novo Registro
    </button>
    <LuRefreshCcw onClick={handlerefresh} className={styles.refresh} />
  </div>
</div>


      {/* Cards de totais */}
      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <p className={styles.cardTitle}>Total</p>
          <strong className={styles.cardNumber}>{total}</strong>
        </div>
        <div className={styles.card}>
          <p className={styles.cardTitle}>Aguardando Retirada</p>
          <strong className={styles.cardNumber}>{totalAguardandoRetirada}</strong>
        </div>
        <div className={styles.card}>
          <p className={styles.cardTitle}>Descartada</p>
          <strong className={styles.cardNumber}>{totalDescartada}</strong>
        </div>
      </div>

      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <p className={styles.cardTitle}>Disponível</p>
          <strong className={styles.cardNumber}>{totalDisponivel}</strong>
        </div>
        <div className={styles.card}>
          <p className={styles.cardTitle}>Em Manutenção</p>
          <strong className={styles.cardNumber}>{totalEmManutencao}</strong>
        </div>
        <div className={styles.card}>
          <p className={styles.cardTitle}>Instalada</p>
          <strong className={styles.cardNumber}>{totalInstalada}</strong>
        </div>
      </div>

      {/* Lista filtrada */}
      <div className={styles.listContainer}>
        {filteredControles.map((maquinasOro) => (
          <div
            key={maquinasOro.id}
            onClick={() => handleDetailMaquinasPendentesOro(maquinasOro)}
            className={styles.list}
          >
            <div className={styles.clientDetail}>
              <p className={`${styles.field} ${styles.name}`}>
                <strong>Máquina:</strong> {maquinasOro.equipamento.name}
              </p>
              <p className={`${styles.field} ${styles.name}`}>
                <strong>Patrimônio:</strong> {maquinasOro.equipamento.patrimonio}
              </p>
              <p className={`${styles.field} ${styles.tecnico}`}>
                <strong>Status:</strong> {maquinasOro.statusMaquinasPendentesOro.name}
              </p>
              <p className={`${styles.field} ${styles.data}`}>
                <strong>Data:</strong>{" "}
                {maquinasOro.created_at
                  ? new Date(maquinasOro.created_at).toLocaleString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  : "Não informado"}
              </p>
              <FaRegTrashAlt
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteCardPendentesOro(maquinasOro.id);
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
