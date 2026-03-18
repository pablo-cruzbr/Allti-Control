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

  const [status, setStatus] = useState<ItemProps[]>([]);
  const [tipo, setTipo] = useState<ItemProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  function handleBack() {
    router.push('/dashboard/tickets');
  }

  useEffect(() => {
    async function fetchData() {
      setFetching(true);
      try {
        const token = await getCookieClient();
        const [tipoRes, statusRes] = await Promise.all([
          api.get("/listtipodechamado", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/liststatusordemdeservico", { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        
        setTipo(tipoRes.data.controles || tipoRes.data || []);
        setStatus(statusRes.data.controles || statusRes.data || []);
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
      descricaodoProblemaouSolicitacao: formData.get("descricaodoProblemaouSolicitacao"),
      solucaodoproblema: formData.get("solucaodoproblema"),
      statusOrdemdeServico_id: formData.get("statusOrdemdeServico_id"),
      tipodeChamado_id: formData.get("tipodeChamado_id"),
      ramal: formData.get("ramal"),
    };

    try {
      const token = await getCookieClient();
      await api.post("/documentacaotecnica", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push("/dashboard/documentacaoTecnica");
    } catch (err: any) {
      console.error(err);
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
        <button className={styles.button} onClick={handleBack}>Voltar</button>
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
            <select name="statusOrdemdeServico_id" required className={styles.input} defaultValue="">
              <option value="" disabled>Selecione o status atual da OS</option>
              {status.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>

            <p>Selecione o Tipo de Chamado</p>
            <select name="tipodeChamado_id" required className={styles.input} defaultValue="">
              <option value="" disabled>Selecione o Tipo de Ordem de Serviço</option>
              {tipo.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>

            <p>Ramal</p>
            <input
              type="text"
              name="ramal"
              placeholder="Digite o ramal..."
              className={styles.input}
              required
            />

            <button className={styles.button} type="submit" disabled={loading || fetching}>
              {loading ? "Enviando..." : "Concluir"}
            </button>
          </form>
        </section>
      </div>
    </section>
  );
}