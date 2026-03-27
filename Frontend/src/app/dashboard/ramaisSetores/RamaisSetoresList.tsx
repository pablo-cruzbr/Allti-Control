'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './ramaisSetores.module.scss';
import { FaRegTrashAlt } from "react-icons/fa";
import { RamaisSetoresProps } from '@/lib/getRamaisSetores.type';
import { getCookieClient } from '@/lib/cookieClient';
import { api } from '@/services/api';
import { useGlobalModal } from '@/provider/GlobalModalProvider';
import { LuRefreshCcw } from "react-icons/lu";
import { toast } from 'sonner';

interface Props {
  ramaisData: RamaisSetoresProps[];
}

export default function RamaisSetoresList({ ramaisData }: Props) {
    const [searchUsuario, setSearchUsuario] = useState<string>("");
    const [searchRamal, setSearchRamal] = useState<string>("");
    const [filterType, setFilterType] = useState<'all' | 'cliente' | 'instituicao'>('all');

    const filteredRamais = ramaisData.filter((ramal) => {
    const matchUsuario = ramal.usuario.toLowerCase().includes(searchUsuario.toLowerCase());
    const matchRamal = ramal.ramal.toLowerCase().includes(searchRamal.toLowerCase());

    const matchesFilterType =
      filterType === 'all' ||
      (filterType === 'cliente' && !!ramal.cliente?.name) ||
      (filterType === 'instituicao' && !!ramal.instituicaoUnidade?.name);

    return matchUsuario && matchRamal && matchesFilterType;
  });


   const handleRefresh = () => {
    router.refresh();
    toast.success("Lista atualizada com sucesso!");
    }
  const router = useRouter();
  const { openModal } = useGlobalModal();

  function handleOpenModal(ramal: RamaisSetoresProps) {
    openModal('ramaisSetores', [ramal]);
  }

  async function handleDeleteRamal(ramal_id: string, e: React.MouseEvent) {
    e.stopPropagation(); 
    
    try {
      const token = getCookieClient();

      await api.delete(`/deleteramal/${ramal_id}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { ramal_id },
      });

      console.log("Ramal removido com sucesso:", ramal_id);
      router.refresh();
    } catch (error) {
      console.error("Erro ao deletar ramal:", error);
    }
  }

  return (
    <section>
      <div className={styles.headerClient}>
        <h1 className={styles.titleClient}>Lista de Ramais e Setores - Tickets</h1>
        <div className={styles.actions}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Pesquisar por usuário"
              value={searchUsuario}
              onChange={(e) => setSearchUsuario(e.target.value)}
              className={styles.searchInput}
            />

            <input
              type="text"
              placeholder="Pesquisar por ramal"
              value={searchRamal}
              onChange={(e) => setSearchRamal(e.target.value)}
              className={styles.searchInput}
            />

             <select
            className={styles.select}
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)} 
          >
            <option value="all">Todos</option>
            <option value="cliente">Apenas Clientes</option>
            <option value="instituicao">Apenas Instituições</option>
          </select>

          </div>

          <button
            className={styles.button}
            onClick={() => router.push('/dashboard/formulariosadd/formularioRamaisSetores')}
          >
            Novo Registro
          </button>
          <LuRefreshCcw onClick={handleRefresh} className={styles.refresh} />
        </div>
      </div>

      <div className={styles.listContainer}>
        {filteredRamais.length === 0 && (
          <p className={styles.emptyMessage}>Nenhum ramal encontrado.</p>
        )}

        {filteredRamais.map((ramal) => (
          <div 
            key={ramal.id} 
            className={styles.list}
            onClick={() => handleOpenModal(ramal)}
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.clientDetail}>
              <p className={`${styles.field} ${styles.name}`}>
                <strong>Usuário:</strong> {ramal.usuario}
              </p>
              <p className={`${styles.field} ${styles.name}`}>
                <strong>Ramal:</strong> {ramal.ramal}
              </p>
              <p className={`${styles.field} ${styles.name}`}>
                <strong>Andar:</strong> {ramal.andar}
              </p>
              <p className={`${styles.field} ${styles.name}`}>
                <strong>Setor:</strong> {ramal.setor?.name}
              </p>
              
              {ramal.cliente?.name ? (
                <p className={`${styles.field} ${styles.name}`}>
                  <strong>Cliente:</strong> {ramal.cliente.name}
                </p>
              ) : ramal.instituicaoUnidade?.name ? (
                <p className={`${styles.field} ${styles.name}`}>
                  <strong>Instituição/Unidade:</strong> {ramal.instituicaoUnidade.name}
                </p>
              ) : null}

              <FaRegTrashAlt
                onClick={(e) => handleDeleteRamal(ramal.id, e)}
                className={styles.iconTrash}
              />

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}