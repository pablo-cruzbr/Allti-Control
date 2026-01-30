"use client";

import styles from "./signup_empresa.module.scss";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/Logo9.svg";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

  //useEffect carrega os clientes ao iniciar os componentes
  useEffect(() => {
    async function fetchClientes(){
      try{
        const response = await api.get("/listcliente");
        setclientes(response.data.controles);
          
     
      }catch (err){
        console.log("Erro ao buscar clientes:", err);
        setError("Erro ao carregar clientes");
      }
    }
    fetchClientes();
  }, [])

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
    const categoryClientes = formData.get("cliente");
    const categorySetores = formData.get("setor")

    if (!name || !email || !password) {
      setError("Por favor preencha todos os campos");
      return;
    }

    try {
      await api.post("/users", {
        name,
        email,
        password,
        cliente_id: cliente[Number(categoryClientes)].id,
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
          <h1>Cadastre uma Empresa</h1>
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
              Selecione uma Empresa 
            </p>

            <select name="cliente" className={styles.input} required>
              {cliente.length === 0 ? (
                <option>Carregando...</option>
                ) : (
                  cliente.map((cliente, index) => (
                    <option key={cliente.id} value={index}>
                      {cliente.name}
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

          {/* 
            <Link href="/" className={styles.text}>
              Já possui uma conta? Faça Login
            </Link> 
          */}
        </section>
      </div>
    </div>
  );
}
