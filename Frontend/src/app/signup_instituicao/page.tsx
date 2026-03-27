"use client";

import styles from "./signup_insituicao.module.scss";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/Logo9.svg";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookieClient } from "@/lib/cookieClient";

export const dynamic = 'force-dynamic';
interface InstituicaoUnidadeProps {
  id: string;
  name: string;
}

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
        const config = token 
          ? { headers: { Authorization: `Bearer ${token}` } } 
          : {};
        
        const [resInstituicoes, resSetores] = await Promise.all([
          api.get("/listinstuicao", config),
          api.get("/listsetores", config)
        ]);

        if (resInstituicoes.data && resInstituicoes.data.instituicoes) {
          setInstituicoes(resInstituicoes.data.instituicoes);
        } else {
          setInstituicoes(resInstituicoes.data || []);
        }
        setSetor(resSetores.data || [])

      } catch (err: any) {
       
        if (err.response?.status === 401) {
          setError("Sessão expirada ou sem permissão. Tente fazer login novamente.");
        } else {
          setError("Erro ao carregar listas de instituições e setores.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadResources();
  }, []); 

  function handleBack(){
    router.push('/dashboard/usuarios')
  }

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const categoryIndexInstituicao = formData.get("instituicaoUnidade");
    const categorySetores = formData.get("setor")

    if (!name || !email || !password || !categoryIndexInstituicao) {
      setError("Por favor preencha todos os campos");
      return;
    }

    try {
      await api.post("/users", {
        name,
        email,
        password,
        instituicaoUnidade_id: instituicoes[Number(categoryIndexInstituicao)].id,
        setor_id: setor[Number(categorySetores)].id,
      });
      router.push("/dashboard/usuarios"); 
    } catch (err) {
      console.log("Erro ao cadastrar:", err);
      setError("Erro no cadastro");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.conteiner}>      
        <section className={styles.login}>
          <h1 className={styles.textHeader}>Cadastre uma Instituição Escolar ou de Saúde</h1>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              required
              name="name"
              placeholder="Digite seu nome"
              className={styles.input}
            />

            <input
              type="email"
              required
              name="email"
              placeholder="Digite seu email"
              className={styles.input}
            />

            <input
              type="password"
              required
              name="password"
              placeholder="Digite sua senha"
              className={styles.input}
            />

            <p className={styles.text}>
              Selecione um Instituição 
            </p>

           <select name="instituicaoUnidade" className={styles.input} required defaultValue="">
              <option value="" disabled> Selecione uma Instituição </option>
              {loading ? (
                <option>Carregando Instituições...</option>
              ) : (
               instituicoes.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))
              )}
            </select>
          
            <p className={styles.text}>
              Selecione um Setor 
            </p>

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
                <button type="submit">Cadastrar</button>
                <button type="button" onClick={handleBack}>Voltar</button>
            </div>
           
          </form>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </section>
      </div>
    </div>
  );
}
