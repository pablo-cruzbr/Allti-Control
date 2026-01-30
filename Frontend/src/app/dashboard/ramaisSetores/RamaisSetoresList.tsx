'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './ramaisSetores.module.scss';
import { FaRegTrashAlt } from "react-icons/fa";
import { RamaisSetoresProps } from '@/lib/getRamaisSetores.type';
import { getCookieClient } from '@/lib/cookieClient';
import { api } from '@/services/api';

interface Props {
  ramaisData: RamaisSetoresProps[];
}

export default function RamaisSetoresList({ ramaisData }: Props) {
  const [searchUsuario, setSearchUsuario] = useState<string>("");
  const [searchRamal, setSearchRamal] = useState<string>("");

  const router = useRouter();

  // Filtro simples por usuário e ramal
  const filteredRamais = ramaisData.filter((ramal) => {
    const matchUsuario = searchUsuario
      ? ramal.usuario.toLowerCase().includes(searchUsuario.toLowerCase())
      : true;

    const matchRamal = searchRamal
      ? ramal.ramal.toLowerCase().includes(searchRamal.toLowerCase())
      : true;

    return matchUsuario && matchRamal;
  });

  async function handleDeleteRamal(ramal_id: string) {
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
        <h1 className={styles.titleClient}>Lista de Ramais e Setores</h1>
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
          </div>

          <button
            className={styles.button}
            onClick={() => router.push('/dashboard/formulariosadd/formularioRamaisSetores')}
          >
            Novo Registro
          </button>
        </div>
      </div>

      <div className={styles.listContainer}>
        {filteredRamais.length === 0 && (
          <p className={styles.emptyMessage}>Nenhum ramal encontrado.</p>
        )}

        {filteredRamais.map((ramal) => (
          <div key={ramal.id} className={styles.list}>
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

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
