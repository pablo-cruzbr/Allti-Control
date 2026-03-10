import Image from "next/image";
import styles from '../../src/app/page.module.scss';
import logoImg from "../../public/Logo10.svg";
import { cookies } from "next/headers";
import { api } from "@/services/api";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const { error } = await searchParams;

  async function handleLogin(formData: FormData) {
    "use server";

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    // Validação básica para evitar requisições vazias
    if (!email || !password) return;

    try {
      const response = await api.post("/session", {
        email,
        password,
      });
       console.log("DADOS DA API:", response.data);
      if (!response.data.token) return;

      const cookieStore = await cookies();
      const oneMonth = 60 * 60 * 24 * 30; // 30 dias em segundos

      // 1. Token de Sessão
      cookieStore.set("session", response.data.token, { 
        maxAge: oneMonth, 
        path: "/",
        httpOnly: true, // Segurança contra XSS
        secure: process.env.NODE_ENV === "production" 
      });

      // 2. Role (Vindo do seu AuthUserService atualizado)
      const userRole = response.data.role || "USER";
      cookieStore.set("role", userRole, { 
        maxAge: oneMonth, 
        path: "/" 
      });

      // 3. isAdmin (Boolean string)
      const isAdminString = response.data.isAdmin ? "true" : "false";
      cookieStore.set("isAdmin", isAdminString, { 
        maxAge: oneMonth, 
        path: "/" 
      });

    } catch (err: any) {
      // Regra de ouro: se for erro de redirect, deixa o Next.js seguir
      if (err.message === 'NEXT_REDIRECT') throw err;
      
      console.log("ERRO NO LOGIN:", err.response?.data || err.message);
      
      // Se falhar (senha errada, etc), volta para o login com erro
      redirect("/?error=credentials");
    }

    // Sucesso total: Redireciona fora do try/catch
    redirect("/dashboard/ticketscount");
  }

  const errorMsg = error === "no_admin" 
    ? "Acesso negado: Somente administradores." 
    : error === "credentials" 
    ? "E-mail ou senha incorretos." 
    : null;

  return (
    <div className={styles.container}>
      <div className={styles.conteiner}>
        <section className={styles.login}>
          <Image
            src={logoImg}
            alt="Logo SF2"
            width={200}
            height={100}
            className={styles.logo}
            priority
          />

          <h1>Faça seu Login</h1>

          {errorMsg && (
            <p style={{ color: '#FF3F4B', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center' }}>
              {errorMsg}
            </p>
          )}

          <form action={handleLogin}>
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

            <button type="submit">Acessar</button>
          </form>
        </section>
      </div>
    </div>
  );
}