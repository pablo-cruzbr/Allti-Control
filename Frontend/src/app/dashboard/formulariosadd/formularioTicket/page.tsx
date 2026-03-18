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

interface UsuarioDataProps {
  id: string;
  usuario: string;
  ramal: string;
  andar: string;
  setor: { id: string; name: string; };
  cliente: { name: string; endereco: string; } | null;
  instituicaoUnidade: { name: string; endereco: string; } | null;
}

export default function FormularioTicket() {
  const router = useRouter();

  const [status, setStatus] = useState<ItemProps[]>([]);
  const [tipo, setTipo] = useState<ItemProps[]>([]);
  const [ramalInput, setRamalInput] = useState(''); // Estado para o valor do input
  const [usuarioEncontrado, setUsuarioEncontrado] = useState<UsuarioDataProps | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  function handleBack() {
    router.push('/dashboard/tickets');
  }

  // Busca inicial de tipos e status
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
        console.error("Erro ao buscar dados iniciais:", err);
      } finally {
        setFetching(false);
      }
    }
    fetchData();
  }, []);

  async function handleSearchRamal() {
    if (!ramalInput) return;

    try {
      setFetching(true);
      const token = await getCookieClient();
      const res = await api.get<UsuarioDataProps[]>("/listinformacoessetor", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const encontrado = res.data.find((item) => item.ramal === ramalInput);

      if (encontrado) {
        setUsuarioEncontrado(encontrado);
      } else {
        setUsuarioEncontrado(null);
        alert("Ramal não encontrado.");
      }
    } catch (err) {
      console.error("Erro ao buscar ramal:", err);
      alert("Erro ao pesquisar ramal.");
    } finally {
      setFetching(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = {
      descricaodoProblemaouSolicitacao: formData.get("descricaodoProblemaouSolicitacao"),
      solucaodoproblema: formData.get("solucaodoproblema"),
      statusOrdemdeServico_id: formData.get("statusOrdemdeServico_id"),
      tipodeChamado_id: formData.get("tipodeChamado_id"),
      ramal: ramalInput,
      // Você também pode enviar o ID do usuário encontrado se sua API permitir
      usuario_id: usuarioEncontrado?.id || null 
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
      </div>

      <div className={styles.container}>
        <section className={styles.login}>
          <form onSubmit={handleSubmit}>
            
            <p>Digite o Ramal do Usuário Atendido</p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="Digite o ramal..."
                className={styles.input}
                value={ramalInput}
                onChange={(e) => setRamalInput(e.target.value)}
              />
              <button 
                type="button" 
                className={styles.btnSearch} 
                onClick={handleSearchRamal}
                title="Pesquisar ramal"
              >
                <IoSearchOutline size={22} color="currentColor" />
              </button>
            </div>

            {usuarioEncontrado && (
        <div style={{ 
          background: '#f4f4f4', 
          padding: '15px', 
          borderRadius: '8px', 
          marginBottom: '20px', 
          border: '1px solid #ddd',
          color: '#333' 
        }}>
          <p><strong>Usuário:</strong> {usuarioEncontrado.usuario}</p>
          <p><strong>Setor:</strong> {usuarioEncontrado.setor.name}</p>
          <p><strong>Andar:</strong> {usuarioEncontrado.andar}</p>

        {usuarioEncontrado.cliente ? (
          <>
            <p><strong>Cliente:</strong> {usuarioEncontrado.cliente.name}</p>
            <p><strong>Endereço:</strong> {usuarioEncontrado.cliente.endereco}</p>
          </>
        ) : usuarioEncontrado.instituicaoUnidade ? (
          <>
            <p><strong>Unidade:</strong> {usuarioEncontrado.instituicaoUnidade.name}</p>
            <p><strong>Endereço:</strong> {usuarioEncontrado.instituicaoUnidade.endereco}</p>
          </>
        ) : (
          <p><em>Nenhum vínculo (Cliente/Unidade) encontrado.</em></p>
        )}
      </div>
    )}
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

            <p>Status</p>
            <select name="statusOrdemdeServico_id" required className={styles.input} defaultValue="">
              <option value="" disabled>Selecione o status</option>
              {status.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>

            <p>Tipo de Chamado</p>
            <select name="tipodeChamado_id" required className={styles.input} defaultValue="">
              <option value="" disabled>Selecione o tipo</option>
              {tipo.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>

            <button className={styles.button} type="submit" disabled={loading || fetching}>
              {loading ? "Enviando..." : "Concluir"}
            </button>
          </form>
        </section>
      </div>
    </section>
  );
}