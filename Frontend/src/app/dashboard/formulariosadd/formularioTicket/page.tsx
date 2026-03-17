'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './FormularioTickets.module.scss';
import { IoArrowBackCircleOutline, IoSearchOutline } from "react-icons/io5"; // Importei a lupa
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';

export const dynamic = 'force-dynamic';

interface ItemProps {
  id: string;
  name: string;
}

export default function FormularioTicket() {
  const router = useRouter();
  
  const [instituicao, setInstituicao] = useState<ItemProps[]>([]);
  const [tecnico, setTecnico] = useState<ItemProps[]>([]);
  const [cliente, setCliente] = useState<ItemProps[]>([]);
  
  // Estados de busca e controle
  const [ramalSearch, setRamalSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  function handleBack() {
    router.push('/dashboard/tickets');
  }

  async function handleSearchRamal() {
    if (!ramalSearch) return;
    console.log("Pesquisando ramal:", ramalSearch);
    // Exemplo: toast.info(`Buscando dados para o ramal ${ramalSearch}...`);
  }

  useEffect(() => {
    async function fetchData() {
      setFetching(true);
      try {
        const token = await getCookieClient();
        const [instRes, tecRes, cliRes] = await Promise.all([
          api.get("/listinstuicao", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/listtecnico", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/listcliente", { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setInstituicao(instRes.data.instituicoes || []);
        setTecnico(tecRes.data.controles || []);
        setCliente(cliRes.data.controles || []);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      } finally {
        setFetching(false);
      }
    }
    fetchData();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = {
      titulo: formData.get("titulo"),
      descricao: formData.get("descricao"),
      instituicaoUnidade_id: formData.get("instituicaoUnidade_id") || null,
      tecnico_id: formData.get("tecnico_id"),
      cliente_id: formData.get("cliente_id") || null,
    };

    try {
      const token = await getCookieClient();
      await api.post("/documentacaotecnica", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push("/dashboard/documentacaoTecnica");
    } catch (err: any) {
      alert("Erro ao cadastrar ticket.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={styles.mainSection}>
      <header className={styles.headerForm}>
        <div className={styles.titleArea}>
          <IoArrowBackCircleOutline size={32} className={styles.backIcon} onClick={handleBack} />
          <h1 className={styles.titleClient}>Novo Ticket Interno</h1>
        </div>
      </header>

      <div className={styles.container}>
        {fetching ? (
          <div className={styles.loader}>Carregando...</div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.formGrid}>
            
            {/* CAMPO DE PESQUISA COM BOTÃO */}
            <div className={styles.inputGroupFull}>
              <label>Pesquisar por Ramal / Usuário</label>
              <div className={styles.searchWrapper}>
                <input
                  type="text"
                  className={styles.inputSearch}
                  placeholder="Digite o ramal e clique na lupa..."
                  value={ramalSearch}
                  onChange={(e) => setRamalSearch(e.target.value)}
                />
                <button 
                  type="button" 
                  className={styles.btnSearch}
                  onClick={handleSearchRamal}
                >
                  <IoSearchOutline size={20} color="#FFF" />
                </button>
              </div>
            </div>

            <div className={styles.inputGroupFull}>
              <label>Título do Ticket</label>
              <input type="text" name="titulo" className={styles.input} required />
            </div>

            <div className={styles.inputGroupFull}>
              <label>Descrição</label>
              <textarea name="descricao" className={styles.textarea} required />
            </div>

            {/* Selects filtrados pelo termo de busca (opcional) */}
            <div className={styles.inputGroup}>
              <label>Unidade</label>
              <select name="instituicaoUnidade_id" className={styles.select}>
                <option value="">Selecione...</option>
                {instituicao
                  .filter(i => i.name.toLowerCase().includes(ramalSearch.toLowerCase()))
                  .map(item => <option key={item.id} value={item.id}>{item.name}</option>)
                }
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label>Cliente</label>
              <select name="cliente_id" className={styles.select}>
                <option value="">Selecione...</option>
                {cliente
                  .filter(i => i.name.toLowerCase().includes(ramalSearch.toLowerCase()))
                  .map(item => <option key={item.id} value={item.id}>{item.name}</option>)
                }
              </select>
            </div>


            <div className={styles.inputGroup}>
              <label>Técnico</label>
              <select name="tecnico_id" className={styles.select} required>
                {tecnico.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
            </div>

            <div className={styles.actions}>
              <button className={styles.buttonSubmit} type="submit" disabled={loading}>
                {loading ? 'Salvando...' : 'Concluir Cadastro'}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}