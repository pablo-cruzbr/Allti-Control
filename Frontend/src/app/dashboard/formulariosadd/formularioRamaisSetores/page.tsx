"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./FormularioRamaisSertores.module.scss";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
export const dynamic = 'force-dynamic';
interface SetoresProps {
  id: string;
  name: string;
}

interface InstituicaoUnidadeProps {
  id: string;
  name: string;
}

interface ClientesProps {
  id: string;
  name: string;
}

export default function FormularioRamaisSetores() {
  const [setores, setSetores] = useState<SetoresProps[]>([]);
  const [clientes, setClientes] = useState<ClientesProps[]>([]);
  const [instituicoes, setInstituicoes] = useState<InstituicaoUnidadeProps[]>([]);

  const router = useRouter();

  function handleBackCardCompras() {
    router.push("/dashboard/ramaisSetores");
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await getCookieClient();

        const [setoresRes, clientesRes, instituicoesRes] = await Promise.all([
          api.get("/listsetores", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/listcliente", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/listinstuicao", { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setSetores(Array.isArray(setoresRes.data) ? setoresRes.data : []);
        setClientes(Array.isArray(clientesRes.data.controles) ? clientesRes.data.controles : []);
        setInstituicoes(Array.isArray(instituicoesRes.data.instituicoes) ? instituicoesRes.data.instituicoes : []);
      } catch (err) {
        console.error("Erro ao buscar dados: ", err);
      }
    }

    fetchData();
  }, []);

 async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);

  const usuario = formData.get("usuario") as string;
  const ramal = formData.get("ramal") as string;
  const andar = formData.get("andar") as string;
  const setorId = formData.get("setor_id") as string;
  const clienteId = formData.get("cliente_id") as string;
  const instituicaoUnidadeId = formData.get("instituicaoUnidade_id") as string;

  // 🔑 Tratamento dos selects para converter "null" em null de verdade
  const payload = {
    usuario,
    ramal,
    andar,
    setorId: setorId || null,
    clienteId: clienteId === "null" ? null : clienteId,
    instituicaoUnidadeId: instituicaoUnidadeId === "null" ? null : instituicaoUnidadeId,
  };

  try {
    const token = await getCookieClient();

    // ✅ Axios: primeiro argumento = payload, segundo = config (headers)
    await api.post("/informacoessetor", payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    router.push("/dashboard/ramaisSetores");
  } catch (err) {
    console.error("Erro ao enviar formulário:", err);
  }
}


  return (
    <section>
      <div className={styles.headerClient}>
        <h1 className={styles.titleClient}>CADASTRO RAMAIS E SETORES</h1>
        <IoArrowBackCircleOutline size={30} color="#4B4B4B" onClick={handleBackCardCompras} />
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
              name="usuario"
              placeholder="Digite o nome do Usuário"
              className={styles.input}
            />
            <input
              type="text"
              required
              name="ramal"
              placeholder="Digite o Ramal"
              className={styles.input}
            />
            <input
              type="text"
              required
              name="andar"
              placeholder="Digite o Andar"
              className={styles.input}
            />

            <select name="setor_id" className={styles.input} required>
              <option value="" disabled hidden>
                Selecione o Setor
              </option>
              {setores.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <select name="cliente_id" className={styles.input}>
              {clientes.length === 0 ? (
                <option>Carregando...</option>
              ) : (
                <>
                  <option value="" disabled hidden>
                    Selecione o Cliente
                  </option>
                  <option value="null">Nenhum cliente</option>
                  {clientes.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </>
              )}
            </select>

            <select name="instituicaoUnidade_id" className={styles.input}>
              <option value="" disabled hidden>
                Selecione a Instituição/Unidade
              </option>
              <option value="null">Nenhuma Instituição/Unidade</option>
              {instituicoes.map((item) => (
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
