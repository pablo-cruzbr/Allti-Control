"use client";

import { toast } from 'sonner';
import styles from "./signup_insituicao.module.scss";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookieClient } from "@/lib/cookieClient";

export const dynamic = 'force-dynamic';

interface InstituicaoUnidadeProps {
  id: string;
  name: string;
}

interface SetorProps {
  id: string;
  name: string;
}

export default function Signup() {
  const router = useRouter();
  const [instituicoes, setInstituicoes] = useState<InstituicaoUnidadeProps[]>([]);
  const [setor, setSetor] = useState<SetorProps[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadResources() {
      try {
        setLoading(true);
        setError("");

        const token = typeof getCookieClient === 'function' ? getCookieClient() : null;
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

        const [resInstituicoes, resSetores] = await Promise.all([
          api.get("/listinstuicao", config),
          api.get("/listsetores", config)
        ]);
        if (resInstituicoes.data && resInstituicoes.data.instituicoes) {
          setInstituicoes(resInstituicoes.data.instituicoes);
        } else {
          setInstituicoes(resInstituicoes.data || []);
        }
        setSetor(resSetores.data || []);

      } catch (err: any) {
        if (err.response?.status === 401) {
          setError("Sessão expirada. Faça login novamente.");
        } else {
          setError("Erro ao carregar dados do servidor.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadResources();
  }, []);

async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  setError(""); 
  
  const formData = new FormData(event.currentTarget);
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const instituicaoId = formData.get("instituicaoUnidade");
  const setorId = formData.get("setor");

  if (!name || !email || !password || !instituicaoId || !setorId) {
    toast.warning("Preencha todos os campos obrigatórios.");
    return;
  }

  try {
    await api.post("/users", {
      name,
      email,
      password,
      instituicaoUnidade_id: instituicaoId,
      setor_id: setorId,
    });

    // Feedback de Sucesso
    toast.success("Usuário cadastrado com sucesso!");
    
    // Pequeno delay para o usuário ver o toast antes de ser redirecionado
    setTimeout(() => {
      router.push("/dashboard/usuarios");
    }, 2000);

  } catch (err: any) {
    console.error("Erro no cadastro:", err);
    const message = err.response?.data?.error || "Erro ao cadastrar usuário.";
    toast.error(message);
    setError(message);
  }
}
  return (
    <div className={styles.container}>
      <div className={styles.conteiner}>
        <section className={styles.login}>
          <h1 className={styles.textHeader}>Cadastre um Novo Usuário</h1>
          
          <form onSubmit={handleRegister}>
            <input
              type="text"
              required
              name="name"
              placeholder="Nome completo"
              className={styles.input}
            />

            <input
              type="email"
              required
              name="email"
              placeholder="E-mail"
              className={styles.input}
            />

            <input
              type="password"
              required
              name="password"
              placeholder="Senha"
              className={styles.input}
            />

            <p className={styles.text}>Instituição / Unidade</p>
            <select name="instituicaoUnidade" className={styles.input} required defaultValue="">
              <option value="" disabled>Selecione uma Instituição</option>
              {instituicoes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <p className={styles.text}>Setor de Atendimento</p>
            <select name="setor" className={styles.input} required defaultValue="">
              <option value="" disabled>Escolha um setor</option>
              {setor.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            {error && <p className={styles.errorMessage}>{error}</p>}

            <div className={styles.buttonGroup}>
              <button type="submit" disabled={loading} className={styles.btnRegister}>
                {loading ? "Carregando..." : "Finalizar Cadastro"}
              </button>
              <button type="button" onClick={() => router.back()} className={styles.btnBack}>
                Voltar
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}