"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./FormularioSertores.module.scss";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
export const dynamic = 'force-dynamic';
interface RamaisSetoresProps {
  id: string;
  usuario: string;
  ramal: string;
  andar: string;
  setor: {
    id: string;
    name: string;
  };
}

interface SetoresProps {
  id: string;
  name: string;
}

export default function FormularioSetores() {
  const [setores, setSetores] = useState<SetoresProps[]>([]);
  const router = useRouter();

  function handleBackCardCompras() {
    router.push("/dashboard/setor");
  }

  useEffect(() => {
    async function fetchSetores() {
      try {
        const token = await getCookieClient();
        console.log("TOKEN DO USUÁRIO: ", token);

        const response = await api.get("/listsetores", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSetores(response.data);
      } catch (err) {
        console.error("Erro ao buscar setores: ", err);
      }
    }

    fetchSetores();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      name: formData.get("name"),
    };

    console.log("Form Data:", data);

    try {
      const token = await getCookieClient();

      await api.post("/categorysetor", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      router.push("/dashboard/setor");
    } catch (err) {
      console.error("Erro ao enviar formulário:", err);
    }
  }

  return (
    <section>
      <div className={styles.headerClient}>
        <h1 className={styles.titleClient}>CADASTRO DE SETORES</h1>
        <IoArrowBackCircleOutline
          size={30}
          color="#4B4B4B"
          onClick={handleBackCardCompras}
        />
        <button className={styles.button} onClick={handleBackCardCompras}>
          Voltar para Lista
        </button>
      </div>

      <div className={styles.container}>
        <section className={styles.login}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              required
              name="name"
              placeholder="Digite o nome do Setor"
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
