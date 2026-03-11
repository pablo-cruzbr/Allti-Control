import Image from "next/image";
import styles from './page.module.scss';
import logoImg from "../../public/Logo10.svg";
import { cookies } from "next/headers";
import { api } from "@/services/api";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";

interface PageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const error = params?.error;

  async function handleLogin(formData: FormData) {
    "use server";

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    let userRole = "USER";

    if (!email || !password) return;

    let loginSuccess = false;

   try {
      const response = await api.post("/session", { email, password });

      if (response.data.token) {
        const cookieStore = await cookies();
        const oneMonth = 60 * 60 * 24 * 30;

        cookieStore.delete("isAdmin");

        cookieStore.set("session", response.data.token, { 
          maxAge: oneMonth, 
          path: "/",
          httpOnly: true, 
          secure: process.env.NODE_ENV === "production" 
        });

        // Capturamos a role aqui para o redirecionamento
        userRole = response.data.role?.toUpperCase() || "USER";
        cookieStore.set("role", userRole, { maxAge: oneMonth, path: "/" });
        
        loginSuccess = true;
      }
    } catch (err: any) {
      if (isRedirectError(err)) throw err;
      console.log("ERRO NO LOGIN:", err.response?.data || err.message);
      redirect("/?error=credentials");
    }

    if (loginSuccess) {
      // REGRA DE REDIRECIONAMENTO APÓS LOGIN
      if (userRole === "ADMIN") {
        redirect("/dashboard/ticketscount"); // Admin vê os contadores/gráficos
      } else {
        redirect("/dashboard/tickets"); // Usuário comum vai direto para a lista
      }
    }
  }

  const errorMsg = error === "no_admin" 
    ? "Acesso negado: Perfil sem permissão." 
    : error === "credentials" 
    ? "E-mail ou senha incorretos." 
    : null;

  return (
    <div className={styles.container}>
      <div className={styles.conteiner}>
        <section className={styles.login}>
          <Image src={logoImg} alt="Logo" width={200} height={100} priority />
          <h1>Faça seu Login</h1>

          {errorMsg && (
            <p style={{ 
              color: '#FF3F4B', 
              fontWeight: 'bold', 
              marginBottom: '10px', 
              textAlign: 'center',
              backgroundColor: 'rgba(255, 63, 75, 0.1)',
              padding: '8px',
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              {errorMsg}
            </p>
          )}

          <form action={handleLogin}>
            <input 
              type="email" 
              name="email" 
              placeholder="E-mail" 
              required 
              className={styles.input} 
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Senha" 
              required 
              className={styles.input} 
            />
            <button type="submit" className={styles.button}>Acessar Sistema</button>
          </form>
        </section>
      </div>
    </div>
  );
}