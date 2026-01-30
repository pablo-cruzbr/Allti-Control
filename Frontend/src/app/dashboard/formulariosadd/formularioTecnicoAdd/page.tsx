"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './FormularioTecnicoAdd.module.scss';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';
export const dynamic = 'force-dynamic';
interface TecnicoProps {
  id: string;
  name: string;
}

export default function FormularioTecnicoAdd() {
  const [compras, setCompras] = useState<TecnicoProps[]>([]);
  const router = useRouter();

  function handleBackCardTecnicos() {
    router.push('/dashboard/controles/tecnicos');
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
        setCompras(response.data);
      } catch (err) {
        console.error("Erro ao buscar status Compras: ", err);
      }
    }

    fetchStatusCompras();
  }, []);

  async function handleFormularioTecnicos(event: React.FormEvent<HTMLFormElement>) {
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
      await api.post("/tecnico", {
        name,
        patrimonio,
        
      },
        {
          headers:{
            Authorization: `Bearer ${token}`,
          },
        }
      );

      router.push("/dashboard/controles/tecnicos");
    } catch (err) {
      console.error("Erro ao enviar solicitação de compra: ", err);
    }
  }

  return (
    <section>
      <div className={styles.headerClient}>
        <h1 className={styles.titleClient}> CADASTRO DE TÉCNICOS</h1>
        <IoArrowBackCircleOutline size={30} color="#4B4B4B" onClick={handleBackCardTecnicos}/>
        <button className={styles.button} onClick={handleBackCardTecnicos}>
          Voltar
        </button>
      </div>

      <div className={styles.container}>
        <section className={styles.login}>
          <form onSubmit={handleFormularioTecnicos}>
            <input
              type="text"
              required
              name="name"
              placeholder="Digite nome do Tecnico"
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
