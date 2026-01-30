'use client';

import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './cardListPendentesLab.module.scss';
import { FaRegTrashAlt } from "react-icons/fa";
import { useGlobalModal } from '@/provider/GlobalModalProvider';
import { getCookieClient } from '@/lib/cookieClient';
import { api } from '@/services/api';
import { ModalContext } from '@/provider/compras';
import { MaquinasPendentesLabProps, MaquinasPendentesLabResponse } from '@/lib/getMaquinasPendentesLab.type';
import { LuRefreshCcw } from "react-icons/lu";

interface Props {
  MaquinasPendentesLabData: MaquinasPendentesLabResponse;
}

export default function PendentesLaboratorioList({ MaquinasPendentesLabData }: Props) {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [searchOS, setSearchOS] = useState<string>(""); 

  const {
    controles = [],
    total = 0,
    totalPendenteOro = 0,
    totalSubstituta = 0,
  } = MaquinasPendentesLabData || {};

  const { openModal } = useGlobalModal();
  const { isOpen, onRequestOpen } = useContext(ModalContext);
  const router = useRouter();

  const statusOption = [
    { id: "ce276161-b447-4afe-9cfb-a893667c455e", name: "PENDENTE ORO" },
    { id: "fdb84c7c-b59e-404f-bbe4-63f95c291057", name: "SUBSTITUTA" },
  ];

  async function handleDetailMaquinasPendentesLab(maquinasLab: MaquinasPendentesLabProps) {
    openModal('maquinasPendentesLab', [maquinasLab]);
  }

  async function handleAddCardPendentesLab() {
    router.push('/dashboard/formulariosadd/formularioPendentesLab');
  }

  function handleRefresh() {
    router.refresh();
  }

  async function handleDeleteCardPendentesLaboratorio(controle_id: string) {
    try {
      const token = await getCookieClient();

      if (!token) {
        alert("Token não encontrado, faça login novamente");
        return;
      }

      await api.delete(`/deletecontroledemaquinaspendenteslab/${controle_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      router.refresh();
    } catch (error) {
      console.error("Erro ao deletar a compra:", error);
    }
  }

  // FILTRAGEM CORRIGIDA
  const filteredControles = controles.filter((maquina) => {
    const searchLower = searchOS.toLowerCase();
    const patrimonio = maquina.equipamento?.patrimonio ?? "";
    const osLab = maquina.idDaOs ?? ""; // Ajuste aqui: idDaOs vem da interface

    const matchesSearch = searchLower
      ? patrimonio.toLowerCase().includes(searchLower) || osLab.toLowerCase().includes(searchLower)
      : true;

    const matchesStatus = selectedStatus
      ? maquina.statusMaquinasPendentesLab?.id === selectedStatus
      : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <section>
      <div className={styles.headerClient}>
        <h1 className={styles.titleClient}>Controle de Maquinas Pendentes Laboratório</h1>

        <div className={styles.actions}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Pesquisar por patrimônio / OS"
              value={searchOS}
              onChange={(e) => setSearchOS(e.target.value)}
              className={styles.searchInput}
            />

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

          <button className={styles.button} onClick={handleAddCardPendentesLab}>
            Novo Registro
          </button>
          <LuRefreshCcw onClick={handleRefresh} className={styles.refresh}/>
        </div>
      </div>

      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <p className={styles.cardTitle}>Total</p>
          <strong className={styles.cardNumber}>{total}</strong>
        </div>

        <div className={styles.card}>
          <p className={styles.cardTitle}>Pendente Oro</p>
          <strong className={styles.cardNumber}>{totalPendenteOro}</strong>
        </div>

        <div className={styles.card}>
          <p className={styles.cardTitle}>Substituta</p>
          <strong className={styles.cardNumber}>{totalSubstituta}</strong>
        </div>
      </div>

      <div className={styles.listContainer}>
        {filteredControles.map((maquinasLab) => (
          <div
            key={maquinasLab.id}
            onClick={() => handleDetailMaquinasPendentesLab(maquinasLab)}
            className={styles.list}
          >
            <div className={styles.clientDetail}>
              <p className={`${styles.field} ${styles.name}`}>
                <strong>Maquina:</strong> {maquinasLab.equipamento?.name ?? "-"}
              </p>

              <p className={`${styles.field} ${styles.name}`}>
                <strong>Patrimônio:</strong> {maquinasLab.equipamento?.patrimonio ?? "-"}
              </p>
              <p className={`${styles.field} ${styles.ticket}`}>
                <strong>SSD:</strong> {maquinasLab.ssd ?? "-"}
              </p>
              <p className={`${styles.field} ${styles.tecnico}`}>
                <strong>Status:</strong> {maquinasLab.statusMaquinasPendentesLab?.name ?? "-"}
              </p>
              <p className={`${styles.field} ${styles.data}`}>
                <strong>Data:</strong>{" "}
                {maquinasLab.created_at
                  ? new Date(maquinasLab.created_at).toLocaleString("pt-BR", {
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
                  handleDeleteCardPendentesLaboratorio(maquinasLab.id);
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
