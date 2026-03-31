'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './FormularioTickets.module.scss';
import { IoArrowBackCircleOutline, IoSearchOutline } from "react-icons/io5"; 
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '@/lib/JWTpayload.type';

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
  cliente: {id: string; name: string; endereco: string; } | null;
  instituicaoUnidade: {id: string; name: string; endereco: string; } | null;
}

export default function FormularioTicket() {
  const router = useRouter();

  const [status, setStatus] = useState<ItemProps[]>([]);
  const [tipo, setTipo] = useState<ItemProps[]>([]);
  const [tiposOrdem, setTiposOrdem] = useState<ItemProps[]>([]);
  const [ramalInput, setRamalInput] = useState(''); 
  const [nameInput, setNameInput] = useState(''); 
  const [usuarioEncontrado, setUsuarioEncontrado] = useState<UsuarioDataProps | null>(null);
  
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
        const [tipoRes, statusRes, tipodeordemRes] = await Promise.all([
          api.get("/listtipodechamado", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/liststatusordemdeservico", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/listtipodeordemdeservico", { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setTiposOrdem(tipodeordemRes.data.controles || tipodeordemRes.data || []);
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
    if (!ramalInput) {
      alert("Digite um ramal");
      return null;
    }

    try {
      setFetching(true);
      const token = await getCookieClient();
      const res = await api.get<UsuarioDataProps[]>("/listinformacoessetor", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const encontrado = res.data.find((item) => item.ramal === ramalInput);

      if (encontrado) {
        setUsuarioEncontrado(encontrado);
        setNameInput(encontrado.usuario); 
        return encontrado; 
      } else {
        setUsuarioEncontrado(null);
        alert("Ramal não encontrado.");
        return null; 
      }
    } catch (err) {
      return null; 
    } finally {
      setFetching(false);
    }
  }

  async function handleSearchName() {
    if(!nameInput) {
      alert("Digite um nome");
      return null;
    }

    try {
      setFetching(true);
      const token = await getCookieClient();
      const res = await api.get<UsuarioDataProps[]>("/listinformacoessetor", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const encontrado = res.data.find((item) => 
        item.usuario.toLowerCase().includes(nameInput.toLowerCase())
      );

      if (encontrado) {
        setUsuarioEncontrado(encontrado);
        setRamalInput(encontrado.ramal); // Sincroniza o campo de ramal
        return encontrado;
      } else {
        setUsuarioEncontrado(null);
        alert("Usuário não encontrado.");
        return null;
      }
    } catch (err) {
      return null;
    } finally {
      setFetching(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const TICKET_TYPE_ID = "9255770c-a7b5-400b-9773-8b249f04b9ed";

    try {
      const token = await getCookieClient();
      if (!token) return;

      let usuarioFinal = usuarioEncontrado;

      if (!usuarioFinal) {
        alert("Por favor, pesquise um usuário por ramal ou nome antes de concluir.");
        setLoading(false);
        return;
      }

      const decoded = jwtDecode<JwtPayload>(token);
      const user_id = decoded.sub;
      const numeroOS = Math.floor(10000 + Math.random() * 90000); 

      const payload = {
        numeroOS: numeroOS,
        name: usuarioFinal.usuario, 
        descricaodoProblemaouSolicitacao: formData.get("descricaodoProblemaouSolicitacao")?.toString(),
        solucaodoproblema: formData.get("solucaodoproblema")?.toString(),
        statusOrdemdeServico_id: formData.get("statusOrdemdeServico_id")?.toString() || undefined,
        tipodeOrdemdeServico_id: TICKET_TYPE_ID, 
        tipodeChamado_id: formData.get("tipodeChamado_id")?.toString() || undefined,
        ramal: ramalInput,
        informacoesSetorId: usuarioFinal.id,
        user_id: user_id,
        cliente_id: usuarioFinal.cliente?.id || null,
        instituicaoUnidade_id: usuarioFinal.instituicaoUnidade?.id || null,
        equipamento_id: null,
        prioridade_id: null
      };

      await api.post("/ordemdeservico", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Ticket cadastrado com sucesso!");
      router.refresh();
      router.push("/dashboard/tickets");
    } catch (err: any) {
      console.error("Erro ao cadastrar:", err.response?.data || err.message);
      alert("Erro ao cadastrar ticket. Verifique o console.");
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

             <p>Pesquisar por Nome</p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Digite o nome do usuário..."
                className={styles.input}
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
              <button 
                type="button" 
                className={styles.btnSearch} 
                onClick={handleSearchName}
                title="Pesquisar nome"
              >
                <IoSearchOutline size={22} color="currentColor" />
              </button>
            </div>
            
            <p>Pesquisar por Ramal</p>
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
                <p><strong>Ramal:</strong> {usuarioEncontrado.ramal}</p>
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