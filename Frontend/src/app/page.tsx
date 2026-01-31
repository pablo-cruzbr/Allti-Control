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

    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) return;

    try {
      const response = await api.post("/session", {
        email: email.toString(),
        password: password.toString(),
      });

      if (response.data.isAdmin !== true) {
        redirect("/?error=no_admin");
      }

      if (!response.data.token) return;

      const expressTime = 60 * 60 * 24 * 30 * 1000;
      const cookieStore = await cookies();
      
      cookieStore.set("session", response.data.token, {
        maxAge: expressTime,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
      });

    } catch (err: any) {
 
      if (err.message === 'NEXT_REDIRECT') throw err;
      
      console.log("Erro ao fazer login:", err);
      redirect("/?error=credentials");
    }

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

          <h1>Faça seu Login AlltiControl - Color Palette2</h1>

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