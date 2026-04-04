"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './FormularioMaquinas.module.scss';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';

export const dynamic = 'force-dynamic';

interface ItemProps {
  id: string;
  name: string;
}

export default function FormularioCompras() {
  const [instituicao, setInstituicao] = useState<ItemProps[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function loadInstituicoes() {
      try {
        const token = await getCookieClient();
        const response = await api.get("/listinstuicao", {
          headers: { Authorization: `Bearer ${token}` }
        });
    
        const data = Array.isArray(response.data) ? response.data : response.data.instituicoes;
        setInstituicao(data || []);
      } catch (err) {
        console.error("Erro ao carregar instituições:", err);
      }
    }

    loadInstituicoes();
  }, []);

  function handleBackCardCompras() {
    router.push('/dashboard/controles/equipamentos');
  }

  async function handleFormularioCompras(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const patrimonio = formData.get("patrimonio");
    const instituicaoUnidade_id = formData.get("instituicaoUnidade_id"); 

    try {
      const token = await getCookieClient();

      await api.post("/equipamento", {
        name,
        patrimonio,
        instituicaoUnidade_id, 
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      router.push("/dashboard/controles/equipamentos");
    } catch (err: any) {
      console.error("Erro ao cadastrar equipamento:", err.response?.data || err.message);
    }
  }

  return (
    <section>
      <div className={styles.headerClient}>
        <h1 className={styles.titleClient}> CADASTRO DE EQUIPAMENTOS</h1>
        <IoArrowBackCircleOutline size={30} color="#4B4B4B" onClick={handleBackCardCompras} style={{cursor: 'pointer'}}/>
        <button className={styles.button} onClick={handleBackCardCompras}>
          Voltar para Lista de Equipamentos
        </button>
      </div>

      <div className={styles.container}>
        <section className={styles.login}>
          <form onSubmit={handleFormularioCompras}>
            <input
              type="text"
              required
              name="name"
              placeholder="Digite nome do Equipamento"
              className={styles.input}
            />

            <input
              type="number"
              required
              name="patrimonio"
              placeholder="Digite o Patrimonio"
              className={styles.input}
            />

            <select 
              name="instituicaoUnidade_id" 
              className={styles.input}
              defaultValue=""
              required // Se for obrigatório vincular a uma unidade
            >
              <option value="" disabled>Selecione uma instituição</option>
              {instituicao.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <button className={styles.button} type="submit">
              Cadastrar
            </button>
          </form>
        </section>
      </div>
    </section>
  );
}