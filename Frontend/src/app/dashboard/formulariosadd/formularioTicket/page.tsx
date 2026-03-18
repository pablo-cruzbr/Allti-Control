'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './FormularioTickets.module.scss';
import { IoArrowBackCircleOutline, IoSearchOutline } from "react-icons/io5"; 
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
    <section>
      <div className={styles.headerClient}>
        <h1 className={styles.titleClient}>FORMULÁRIO TICKET</h1>
        <IoArrowBackCircleOutline size={30} color="#4B4B4B" onClick={handleBack} style={{ cursor: 'pointer' }} />
        <button className={styles.button} onClick={handleBack}>
          Voltar
        </button>
      </div>

      <div className={styles.container}>
        <section className={styles.login}>
          <form onSubmit={handleSubmit}>
            <p>Adicione a Descrição do Problema</p>
              <div className={`${styles.input} ${styles.textAreaContainer}`}>
                <textarea
                  name="descricaodoProblemaouSolicitacao"
                  placeholder="Descrição do Problema ou Solicitação"
                  required
                  className={styles.textarea}
                />
              </div>

              <p>Adicione a Solução</p>
              <div className={`${styles.input} ${styles.textAreaContainer}`}>
                <textarea
                  name="solucaodoproblema"
                  placeholder="Descreva como resolveu o problema"
                  required
                  className={styles.textarea}
                />
              </div>

               <p>Selecione o Status</p>
                <select name="status_id" required className={styles.input}>
                  <option value="" disabled hidden>
                    Selecione o status atual da OS
                  </option>
                 
                </select>

                <p>Selecione o Tipo de Chamado</p>
                <select name="status_id" required className={styles.input}>
                  <option value="" disabled hidden>
                    Selecione o Tipo de Ordem de Servico
                  </option>
                 
                </select>
              

            <input
              type="text"
              required
              name="name"
              placeholder="Digite o ramal e clique na lupa..."
              className={styles.input}
            />

            <button 
                  type="button" 
                  className={styles.btnSearch}
                  onClick={handleSearchRamal}
                >
                  <IoSearchOutline size={20} color="#FFF" />
            </button>       
            <button className={styles.button} type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Concluir"}
            </button>
          </form>
        </section>
      </div>
    </section>
  );
}