'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './setores.module.scss';
import { FaRegTrashAlt } from "react-icons/fa";
import { SetoresProps } from '@/lib/getSetores.type';
import { getCookieClient } from '@/lib/cookieClient';
import { api } from '@/services/api';

interface Props {
  setoresData: SetoresProps[];
}

export default function SetoresList({ setoresData }: Props) {
  const [searchUsuario, setSearchUsuario] = useState<string>("");
  const router = useRouter();

  // Filtro simples por setor
  const filteredRamais = setoresData.filter((setor) => {
    const matchUsuario = searchUsuario
       ? setor.name?.toLowerCase().includes(searchUsuario.toLowerCase())
    : true;
    return matchUsuario;
  });

  async function handleDeleteRamal(ramal_id: string) {
    try {
      const token = await getCookieClient(); 

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
        <h1 className={styles.titleClient}>Lista de Setores</h1>
        <div className={styles.actions}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Pesquisar por Setor"
              value={searchUsuario}
              onChange={(e) => setSearchUsuario(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <button
            className={styles.button}
            onClick={() =>
              router.push('/dashboard/formulariosadd/formularioSetores')
            }
            >
                Novo Registro
            </button>
            </div>
        </div>
      

      <div className={styles.listContainer}>
        {filteredRamais.length === 0 && (
          <p className={styles.emptyMessage}>Nenhum ramal encontrado.</p>
        )}

        {filteredRamais.map((setor) => (
          <div key={setor.id} className={styles.list}>
            <div className={styles.clientDetail}>
              <p className={`${styles.field} ${styles.name}`}>
                <strong>Setor:</strong> {setor.name}
              </p>

              <FaRegTrashAlt
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteRamal(setor.id);
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
