'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './FormularioClientesPrivados.module.scss';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';
export const dynamic = 'force-dynamic';
interface ItemProps {
  id: string;
  name: string;
}

export default function FormularioClientesPrivados() {

  const router = useRouter();

  function handleBack() {
    router.push('/dashboard/clientesprivados');
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = formData.get("name");
    const endereco = formData.get("endereco")
    const cnpj = formData.get("cnpj")
    

    if (!name || !endereco || !cnpj) {
      alert("Por favor, preencha o campo!!!.");
      return;
    }

    console.log("Form Data enviado:", {
      name, endereco, cnpj
    });

    try {
      const token = await getCookieClient();

      await api.post(
        "/categorycliente",
        {
          name,
          endereco,
          cnpj
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      router.push("/dashboard/clientesprivados");
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
        <h1 className={styles.titleClient}>CADASTRAR UM NOVO CLIENTE PRIVADO</h1>
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
              name="name"
              placeholder="Insira o Nome da Empresa "
              className={styles.input}
            />

               <input
              type="text"
              required
              name="endereco"
              placeholder="Insira o endereço da Instituição "
              className={styles.input}
            />

            
               <input
              type="number"
              required
              name="cnpj"
              placeholder="Insira o CNPJ da empresa"
              className={styles.input}
            />
            
            <button className={styles.button} type="submit">
              Registrar
            </button>
          </form>
        </section>
      </div>
    </section>
  );
}
