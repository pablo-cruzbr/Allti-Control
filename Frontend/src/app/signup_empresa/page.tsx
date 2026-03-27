"use client";

import styles from "./signup_empresa.module.scss";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookieClient } from "@/lib/cookieClient";

export const dynamic = 'force-dynamic';

interface ClienteProps {
  id: string;
  name: string;
  endereco: string;
}

interface SetorProps {
  id: string;
  name: string;
}

export default function Signup() {
  const router = useRouter();
  const [cliente, setclientes] = useState<ClienteProps[]>([]);
  const [setor, setSetor] = useState<SetorProps[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); 

useEffect(() => {
  async function loadData() {
    try {
      setLoading(true);
      setError("");
      
      const token = getCookieClient(); 

      const config = token 
        ? { headers: { Authorization: `Bearer ${token}` } } 
        : {};

      const [clientesRes, setoresRes] = await Promise.all([
        api.get("/listcliente", config),
        api.get("/listsetores", config)
      ]);

      setclientes(clientesRes.data?.controles || clientesRes.data || []); 
      setSetor(setoresRes.data || []);

    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("Erro 401: Estas rotas exigem login, mas você está na tela de cadastro.");
      } else {
        setError("Erro ao carregar dados do servidor.");
      }
    } finally {
      setLoading(false);
    }
  }

  loadData();
}, []);

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const clienteId = formData.get("cliente"); 
    const setorId = formData.get("setor");

    if (!name || !email || !password || !clienteId || !setorId) {
      setError("Por favor, preencha todos os campos e selecione Empresa/Setor");
      return;
    }

    try {
      await api.post("/users", {
        name,
        email,
        password,
        cliente_id: clienteId,
        setor_id: setorId,
      });
      
      console.log("✅ Usuário cadastrado com sucesso!");
      router.push("/dashboard/usuarios"); 
    } catch (err) {
      console.error("❌ Erro no cadastro:", err);
      setError("Erro ao realizar o cadastro. Tente novamente.");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.conteiner}>
        <section className={styles.login}>
          <h1>Cadastre uma Empresa</h1>
          
          <form onSubmit={handleRegister}>
            <input
              type="text"
              name="name"
              placeholder="Digite seu nome"
              required
              className={styles.input}
            />

            <input
              type="email"
              name="email"
              placeholder="Digite seu email"
              required
              className={styles.input}
            />

            <input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              required
              className={styles.input}
            />

            <p className={styles.text}>Selecione uma Empresa</p>
            <select name="cliente" className={styles.input} required defaultValue="">
              <option value="" disabled> Escolha uma empresa </option>
              {loading ? (
                <option>Carregando empresas...</option>
              ) : (
                cliente.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))
              )}
            </select>

            <p className={styles.text}>Selecione um Setor</p>
            <select name="setor" className={styles.input} required defaultValue="">
              <option value="" disabled> Escolha um setor </option>
              {loading ? (
                <option>Carregando setores...</option>
              ) : (
                setor.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))
              )}
            </select>

            <div className={styles.buttonGroup}>
              <button type="submit" disabled={loading}>
                {loading ? "Aguarde..." : "Cadastrar"}
              </button>
              <button type="button" onClick={() => router.push('/dashboard/usuarios')}>
                Voltar
              </button>
            </div>
          </form>

          {error && <p style={{ color: "#ff4444", marginTop: "10px" }}>{error}</p>}
        </section>
      </div>
    </div>
  );
}