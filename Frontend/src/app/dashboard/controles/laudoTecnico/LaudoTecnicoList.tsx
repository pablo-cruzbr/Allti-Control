'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './cardListLaudoTecnico.module.scss';
import { FaRegTrashAlt } from "react-icons/fa";
import { useGlobalModal } from '@/provider/GlobalModalProvider';
import { LaudoTecnicoProps } from '@/lib/getLaudoTecnico.type';
import { getCookieClient } from '@/lib/cookieClient';
import { api } from '@/services/api';
import { LuRefreshCcw } from "react-icons/lu";

interface Props {
  LaudoTecnico: LaudoTecnicoProps[];
}

export default function LaudoTecnicoList({ LaudoTecnico }: Props) {
  const [searchLaudo, setSearchLaudo] = useState<string>(""); 
  const { openModal } = useGlobalModal();
  const router = useRouter();

  // Filtro ajustado
  const filteredControles = LaudoTecnico.filter((laudo) => {
    if (!searchLaudo) return true;

    const searchLower = searchLaudo.toLowerCase();

    const patrimonio = laudo.equipamento?.patrimonio?.toString() ?? "";
    const osLab = laudo.osLab?.toString() ?? "";

    return patrimonio.toLowerCase().includes(searchLower) || osLab.toLowerCase().includes(searchLower);
  });

  async function handleDetailLaudoTecnico(laudo: LaudoTecnicoProps) {
    openModal('laudotecnico', [laudo]);
  }

  async function handleAddCardCompras() {
    router.push('/dashboard/formulariosadd/formularioLaudoTecnico');
  }

  function handleRefresh() {
    router.refresh();
  }

  async function handleDeleteCardLaudoTecnico(controle_id: string) {
    try {
      const token = await getCookieClient();

      if (!token) {
        alert("Token não encontrado, faça login novamente");
        return;
      }

      await api.delete(`/deletecontroledelaudotecnico/${controle_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      router.refresh();
    } catch (error) {
      console.error("Erro ao deletar o laudo técnico:", error);
      alert("Erro ao tentar excluir, verifique o console.");
    }
  }

  return (
    <section>
      <div className={styles.headerClient}>
        <h1 className={styles.titleClient}>Laudo Técnico</h1>
        <div className={styles.actions}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Pesquisar por patrimônio / OS"
              value={searchLaudo}
              onChange={(e) => setSearchLaudo(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <button className={styles.button} onClick={handleAddCardCompras}>
            Novo Registro
          </button>
          <LuRefreshCcw onClick={handleRefresh} className={styles.refresh}/>
        </div>
      </div>

      <div className={styles.listContainer}>
        {filteredControles.map((laudo) => (
          <div
            key={laudo.id}
            onClick={() => handleDetailLaudoTecnico(laudo)}
            className={styles.list}
          >
            <div className={styles.clientDetail}>
              <p className={`${styles.field} ${styles.name}`}>
                <strong>OS Lab:</strong> {laudo.osLab}
              </p>
              <p className={`${styles.field} ${styles.name}`}>
                <strong>Equipamento:</strong> {laudo.equipamento?.name ?? "-"}
              </p>
              <p className={`${styles.field} ${styles.tecnico}`}>
                <strong>Patrimônio:</strong> {laudo.equipamento?.patrimonio ?? "-"}
              </p>
              <p className={`${styles.field} ${styles.ticket}`}>
                <strong>Instituição Unidade:</strong> {laudo.instituicaoUnidade?.name ?? "-"}
              </p>
              <p className={`${styles.field} ${styles.data}`}>
                <strong>Data:</strong>{" "}
                {laudo.created_at
                  ? new Date(laudo.created_at).toLocaleString("pt-BR", {
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
                  handleDeleteCardLaudoTecnico(laudo.id);
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
