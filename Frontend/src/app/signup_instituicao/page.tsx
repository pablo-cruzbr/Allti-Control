"use client";

import styles from "./signup_insituicao.module.scss";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/Logo9.svg";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

  //useEffct carrega as instituições ao iniciar os componentes
  useEffect(() => {
    async function fetchInstituicoes() {
      try {
        const response = await api.get("/listinstuicao"); 
        setInstituicoes(response.data.instituicoes);
      } catch (err) {
        console.log("Erro ao buscar instituições:", err);
        setError("Erro ao carregar instituições");
      }
    }
    fetchInstituicoes();
  }, []);

  //useEffect carrega os setores ao iniciar os componentes
  useEffect(() => {
    async function fetchSetor(){
      try{
        const response = await api.get("/listsetores");
        setSetor(response.data);
      }catch (err){
        console.log("Erro ao buscar Setor:", err);
        setError("Erro ao carregar Setor");
      }
    }
    fetchSetor();
  }, [])

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

            <select name="instituicaoUnidade" className={styles.input} required>
              {instituicoes.length === 0 ? (
                <option>Carregando...</option>
              ) : (
                instituicoes.map((instituicao, index) => (
                  <option key={instituicao.id} value={index}>
                    {instituicao.name}
                  </option>
                ))
              )}
            </select>

            <p className={styles.text}>
              Selecione um Setor 
            </p>

            <select name="setor" className={styles.input} required>
              {setor.length === 0 ? (
                <option>Carregando...</option>
              ) : (
                setor.map((setor, index) => (
                  <option key={setor.id} value={index}>
                    {setor.name}
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
