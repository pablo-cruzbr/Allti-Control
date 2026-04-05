'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './cardListEquipamento.module.scss';
import { FaRegTrashAlt } from "react-icons/fa";
import { useGlobalModal } from '@/provider/GlobalModalProvider';
import { EquipamentoProps } from '@/lib/getEquipamento.type';
import { getCookieClient } from '@/lib/cookieClient';
import { api } from '@/services/api';
import { LuRefreshCcw } from "react-icons/lu";

interface Props {
  Equipamento: EquipamentoProps[];
}

export default function EquipamentoList({ Equipamento }: Props) {
  const { openModal } = useGlobalModal(); 
  const router = useRouter();
  const [searchPatrimonio, setSearchPatrimonio] = useState<string>(""); 

  async function handleDetailEquipamento(equipamento: EquipamentoProps) {
   
    openModal('equipamento', [equipamento]);
  }

  async function handleAddCard() {
    router.push('/dashboard/formulariosadd/formularioMaquinas');
  }
  
  function handlerefresh() {
    router.refresh();
  }

  const filteredEquipamento = Equipamento.filter(equip => 
    searchPatrimonio
      ? equip.patrimonio?.toLowerCase().includes(searchPatrimonio.toLowerCase())
      : true
  );

  async function handleDeleteCardEquipamento(equipamento_id: string) {
    if(!confirm("Deseja realmente excluir este equipamento?")) return;

    try {
      const token = await getCookieClient();

      await api.delete(`/deleteequipamento/${equipamento_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      router.refresh();
    } catch (error) {
      console.error("Erro ao deletar o equipamento:", error);
    }
  }

  return (
    <section>
      <div className={styles.headerClient}>
        <h1 className={styles.titleClient}>Controle de Equipamentos Cadastrados</h1>
        <div className={styles.actions}>
          <div className={styles.searchContainer}>
            <input 
              type="text"
              placeholder="Pesquisar por patrimônio..."
              value={searchPatrimonio}
              onChange={(e) => setSearchPatrimonio(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <button className={styles.button} onClick={handleAddCard}>
            Cadastrar um Novo Equipamento
          </button>
          <LuRefreshCcw onClick={handlerefresh} className={styles.refresh}/>
        </div>
      </div>

      <div className={styles.listContainer}>
        {filteredEquipamento.map((equipamento) => (
          <div
            key={equipamento.id}
            onClick={() => handleDetailEquipamento(equipamento)}
            className={styles.list}
          >
            <div className={styles.clientDetail}>
              <p className={`${styles.field} ${styles.name}`}>
                <strong>Nome da Maquina:</strong> {equipamento.name}
              </p>
              <p className={`${styles.field} ${styles.name}`}>
                <strong>Patrimônio:</strong> {equipamento.patrimonio}
              </p>
              
              {equipamento.instituicaoUnidade && (
                 <p className={styles.field}>
                   <strong>Unidade:</strong> {equipamento.instituicaoUnidade.name}
                 </p>
              )}

              <p className={`${styles.field} ${styles.data}`}>
                <strong>Data:</strong>{" "}
                {equipamento.created_at
                  ? new Date(equipamento.created_at).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Não informado"}
              </p>
              <FaRegTrashAlt
                onClick={(e) => {
                  e.stopPropagation(); // Evita abrir o modal ao clicar na lixeira
                  handleDeleteCardEquipamento(equipamento.id);
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