'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './usuario.module.scss';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useGlobalModal } from '@/provider/GlobalModalProvider'; 
import { UsuariosProps, UsuariosPropsResponse } from '@/lib/getUsuario.type';
import { getCookieClient } from '@/lib/cookieClient';
import { api } from '@/services/api';
import { toast } from 'sonner';
import { LuRefreshCcw } from "react-icons/lu";

interface Props {
  usuariosData: UsuariosPropsResponse;
}

export default function UsuarioList({ usuariosData }: Props) {
  const { controles = [], total = 0 } = usuariosData || {};

  const { openModal } = useGlobalModal();
  const router = useRouter();
  const handleRefresh = () => {
  router.refresh();
  toast.success("Lista atualizada com sucesso!");
  }
  const [filterType, setFilterType] = useState<'all' | 'cliente' | 'instituicao'>('all');
  const [searchTerm, setSearchTerm] = useState<string>("");

  // 🔹 Abre o modal passando o tipo 'ramaisSetores' e o usuário dentro de um array
  async function handleDetail(usuario: UsuariosProps) {
    openModal('usuarios', [usuario]);
  }

  async function handleAddUserCorporativo() {
    router.push('/signup_empresa');
  }

  async function handleAddUserMunicipal() {
    router.push('/signup_instituicao');
  }

  async function handleDeleteUsuario(usuarioId: string) {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
      const token = getCookieClient();
      await api.delete(`/deletedesolicitacaodecompras/${usuarioId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          compra_id: usuarioId,
        },
      });

      router.refresh();
    } catch (error) {
      console.error('Erro ao deletar o usuário:', error);
    }
  }

  const filteredUsuarios = controles.filter((usuario) => {
    const searchLower = searchTerm.toLowerCase();

    const matchesSearch =
      usuario.name.toLowerCase().includes(searchLower) ||
      usuario.email.toLowerCase().includes(searchLower) ||
      usuario.instituicaoUnidade?.name?.toLowerCase().includes(searchLower) ||
      usuario.cliente?.name?.toLowerCase().includes(searchLower);

    const matchesFilter =
      filterType === 'all' ||
      (filterType === 'cliente' && usuario.cliente?.name) ||
      (filterType === 'instituicao' && usuario.instituicaoUnidade?.name);

    return matchesSearch && matchesFilter;
  });

  return (
    <section>
      <div className={styles.headerClient}>
        <h1 className={styles.titleClient}>Usuários Cadastrados na Plataforma</h1>
        <p className={styles.pClient}>Pesquise por nome, empresa ou instituição</p>

        <div className={styles.actions}>
          <h1 className={styles.titleClient}>Cadastrar:</h1>
          <button className={styles.button} onClick={handleAddUserCorporativo}>
            Usuário Corporativo
          </button>
          <button className={styles.button} onClick={handleAddUserMunicipal}>
            Usuário Municipal
          </button>
           <LuRefreshCcw onClick={handleRefresh} className={styles.refresh} />
        </div>

        <div className={styles.actions}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Pesquisar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />

            <select
              className={styles.select}
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
            >
              <option value="all">Todos</option>
              <option value="cliente">Clientes</option>
              <option value="instituicao">Instituições</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <p className={styles.cardTitle}>Número de Usuários Cadastrados:</p>
          <strong className={styles.cardNumber}>{total}</strong>
        </div>
      </div>

      <div className={styles.listContainer}>
        {filteredUsuarios.map((usuario) => (
          <div
            key={usuario.id}
            onClick={() => handleDetail(usuario)}
            className={styles.list}
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.clientDetail}>
              <p className={`${styles.field} ${styles.name}`}>
                <strong>Nome: </strong> {usuario.name}
              </p>

              <p className={`${styles.field} ${styles.name}`}>
                <strong>Setor: </strong> {usuario.setor?.name || "Sem Setor"}
              </p>

              <p className={`${styles.field} ${styles.name}`}>
                <strong>Email: </strong> {usuario.email}
              </p>

              {usuario.instituicaoUnidade?.name && (
                <p className={`${styles.field} ${styles.tecnico}`}>
                  <strong>Instituição: </strong> {usuario.instituicaoUnidade.name}
                </p>
              )}

              {usuario.cliente?.name && (
                <p className={`${styles.field} ${styles.tecnico}`}>
                  <strong>Empresa: </strong> {usuario.cliente.name}
                </p>
              )}

              <p className={`${styles.field} ${styles.data}`}>
                <strong>Data:</strong>{' '}
                {usuario.created_at
                  ? new Date(usuario.created_at).toLocaleString('pt-BR', {
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
                  handleDeleteUsuario(usuario.id);
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