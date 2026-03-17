'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './FormularioOrdemdeServico.module.scss';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '@/lib/JWTpayload.type';

export const dynamic = 'force-dynamic';
interface TipoDeChamado {
  id: string;
  name: string;
}

interface TipoDeOrdemdeServico {
  id: string;
  name: string;
}


export default function FormularioOrdemdeServico() {
  const [tiposDeChamado, setTiposDeChamado] = useState<TipoDeChamado[]>([]);
    const [tipodeOrdemdeServico, setTipodeOrdemdeServico] = useState<TipoDeOrdemdeServico[]>([])
    const [loading, setLoading] = useState(false);
  
    const router = useRouter();

     function handleBack() {
    router.push('/dashboard/tickets');
    }

    function gerarNumeroOS(): string {
      return Math.floor(10000 + Math.random() * 90000).toString();
    }

 


  
    useEffect(() => {
      async function fetchTiposDeChamado() {
        try {
          const token = await getCookieClient();
          const response = await api.get('/listtipodechamado', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
          setTiposDeChamado(response.data);
        } catch (error) {
          console.error('Erro ao buscar tipos de chamado:', error);
        }
      }
      fetchTiposDeChamado();
    }, []);
  
     useEffect(() => {
      async function fetchTiposDeOrdemdeServico() {
        try {
           const token = await getCookieClient();
          const response = await api.get('/listtipodeordemdeservico', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setTipodeOrdemdeServico(response.data);
        } catch (error) {
          console.error('Erro ao buscar tipos de chamado:', error);
        }
      }
      fetchTiposDeOrdemdeServico();
    }, []);
  
   async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    if (loading) return;
  
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name')?.toString().trim();
    const tipodeChamado_id = formData.get('tipodeChamado_id')?.toString().trim();
    const tipodeOrdemdeServico_id = formData.get('tipodeOrdemdeServico_id')?.toString().trim();
    const descricaodoProblemaouSolicitacao = formData.get('descricaodoProblemaouSolicitacao')?.toString().trim();
    const nomedoContatoaserProcuradonoLocal =
      formData.get('nomedoContatoaserProcuradonoLocal')?.toString().trim() || null;
  
    if (!name || !tipodeChamado_id || !descricaodoProblemaouSolicitacao) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }
  
    setLoading(true);
  
    try {
      const token = await getCookieClient();
      if (!token) {
        alert('Token de autenticação não encontrado. Faça login novamente.');
        setLoading(false);
        return;
      }
  
      const decoded = jwtDecode<JwtPayload>(token);
      const user_id = decoded.sub;
      const numeroOS = gerarNumeroOS(); 
  
      const payload: any = {
        numeroOS,
        name,
        tipodeChamado_id,
        descricaodoProblemaouSolicitacao,
        nomedoContatoaserProcuradonoLocal,
        user_id,
      };
  
      await api.post('/ordemdeservico', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.refresh()
      router.push('/dashboard/tickets');
    } catch (err) {
      console.error('Erro ao enviar ordem de serviço:', err);
      alert('Erro ao enviar. Verifique os campos e tente novamente.');
      setLoading(false);
    }
  }
  return (
    <section>
      <div className={styles.headerClient}>
        <h1 className={styles.titleClient}>FORMULÁRIO ORDEM DE SERVIÇO</h1>
        <IoArrowBackCircleOutline size={30} color="#4B4B4B" onClick={handleBack} style={{ cursor: 'pointer' }} />
        <button className={styles.button} onClick={handleBack}>
          Voltar
        </button>
      </div>

      <div className={styles.container}>
        <section className={styles.login}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              required
              name="titulo"
              placeholder="Nome do Cliente"
              className={styles.input}
            />

              <p>Selecione o Tipo de Ordem de Serviço</p>
                <select name="tipodeOrdemdeServico_id" required className={styles.input}>
                  <option value="" disabled hidden>
                    Selecione o Tipo de Ordem de Servico
                  </option>
                  {tipodeOrdemdeServico.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.name}
                    </option>
                  ))}
                </select>

             <p>Selecione o Tipo de Chamado</p>
              <select name="tipodeChamado_id" required className={styles.input}>
                <option value="" disabled hidden>
                  Selecione o Tipo de Chamado
                </option>
                {tiposDeChamado.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.name}
                  </option>
                ))}
              </select>

              <p>Adicione a Descrição do Problema</p>
              <div className={`${styles.input} ${styles.textAreaContainer}`}>
                <textarea
                  name="descricaodoProblemaouSolicitacao"
                  placeholder="Descrição do Problema ou Solicitação"
                  required
                  className={styles.textarea}
                />
              </div>

                <input
                  type="text"
                  required
                  name="nomedoContatoaserProcuradonoLocal"
                  placeholder="Nome do Contato no Local (opcional)"
                  className={styles.input}
                />

            
            <button className={styles.button} type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Concluir"}
            </button>
          </form>
        </section>
      </div>
    </section>
  );
}