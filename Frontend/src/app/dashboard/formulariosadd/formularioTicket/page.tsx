'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './FormularioTickets.module.scss';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';
export const dynamic = 'force-dynamic';

interface ItemProps {
  id: string;
  name: string;
}

export default function FormularioTicket() {
  const [instituicao, setInstituicao] = useState<ItemProps[]>([]);
  const [tecnico, setTecnico] = useState<ItemProps[]>([]);
  const [cliente, setCliente] = useState<ItemProps[]>([]);

  const router = useRouter();

  function handleBack() {
    router.push('/dashboard/tickets');
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await getCookieClient();

        const [instituicaoRes, tecnicoRes, clienteRes] = await Promise.all([
          api.get("/listinstuicao", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/listtecnico", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/listcliente", { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setInstituicao(instituicaoRes.data.instituicoes);
        setTecnico(tecnicoRes.data.controles);
        setCliente(clienteRes.data.controles);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
    }

    fetchData();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const titulo = formData.get("titulo");
    const descricao = formData.get("descricao");
    const instituicaoUnidade_id = formData.get("instituicaoUnidade_id") || null;
    const tecnico_id = formData.get("tecnico_id");
    const cliente_id = formData.get("cliente_id") || null;

    if (!titulo || !descricao || !tecnico_id) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    console.log("Form Data enviado:", {
      titulo,
      descricao,
      instituicaoUnidade_id,
      tecnico_id,
      cliente_id,
    });

    try {
      const token = await getCookieClient();

      await api.post(
        "/documentacaotecnica",
        {
          titulo,
          descricao,
          instituicaoUnidade_id,
          tecnico_id,
          cliente_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      router.push("/dashboard/documentacaoTecnica");
    } catch (err: any) {
      console.error("Erro ao enviar formulário:", err);
      if (err.response?.status === 400) {
        alert("Erro 400 - Verifique se todos os campos obrigatórios estão preenchidos corretamente.");
      } else {
        alert("Erro inesperado ao enviar formulário.");
      }
    }
  }

  return (
    <section>
      <div className={styles.headerClient}>
        <h1 className={styles.titleClient}>FORMULÁRIO TICKET</h1>
        <IoArrowBackCircleOutline size={30} color="#4B4B4B" onClick={handleBack} />
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
              placeholder="Título do Card"
              className={styles.input}
            />

            <input
              type="text"
              required
              name="descricao"
              placeholder="Adicione suas Anotações"
              className={styles.input}
            />

            <select name="instituicaoUnidade_id" className={styles.input}>
              <option value="" disabled hidden>Selecione a Instituição/Unidade</option>
              {instituicao.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <select name="tecnico_id" className={styles.input} required>
              <option value="" disabled hidden>Selecione o Técnico</option>
              {tecnico.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <select name="cliente_id" className={styles.input}>
              <option value="" disabled hidden>Selecione o Cliente</option>
              {cliente.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <button className={styles.button} type="submit">
              Concluir
            </button>
          </form>
        </section>
      </div>
    </section>
  );
}
