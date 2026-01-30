"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './FormularioEstabilizador.module.scss';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';
export const dynamic = 'force-dynamic';
interface EstabilizadorProps {
  id: string;
  name: string;
  patrimonio: string
}

export default function formularioEstabilizadorAdd() {
  const [estabilizador, setEstabilizador] = useState<EstabilizadorProps[]>([]);
  const router = useRouter();

  function handleBackCardEstabilizadores() {
    router.push('/dashboard/controles/estabilizares');
  }

  useEffect(() => {
    async function fetchStatusCompras() {
      try {
        const token = await getCookieClient();
        console.log("TOKEN DO USUÁRIO: ", token);
        const response = await api.get("/liststatuscompras", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEstabilizador(response.data);
      } catch (err) {
        console.error("Erro ao buscar status Compras: ", err);
      }
    }

    fetchStatusCompras();
  }, []);

  async function handleFormularioCompras(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const patrimonio = formData.get("patrimonio");
    console.log("Form Data:", {
      name,
      patrimonio,
    });

    try {
      const token = await getCookieClient();
      await api.post("/equipamento/esbilizadores", {
        name,
        patrimonio,
        
      },
        {
          headers:{
            Authorization: `Bearer ${token}`,
          },
        }
      );

      router.push("/dashboard/controles/estabilizares");
    } catch (err) {
      console.error("Erro ao cadastradar estabilizador: ", err);
    }
  }

  return (
    <section>
      <div className={styles.headerClient}>
        <h1 className={styles.titleClient}> CADASTRO DE ESTABILIZADORES</h1>
        <IoArrowBackCircleOutline size={30} color="#4B4B4B" onClick={handleBackCardEstabilizadores}/>
        <button className={styles.button} onClick={handleBackCardEstabilizadores}>
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
              placeholder="Digite nome do Estabilizador"
              className={styles.input}
            />

            <input
              type="number"
              required
              name="patrimonio"
              placeholder="Digite o Patrimonio"
              className={styles.input}
            />

            <button className={styles.button} type="submit">
              Cadastrar
            </button>
          </form>
        </section>
      </div>
    </section>
  );
}
