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

    if (!email || !password) return;

    try {
      // 1. Autenticação na API
      const response = await api.post("/session", { email, password });

      if (response.data.token) {
        const userRole = response.data.role?.toUpperCase() || "USER";

        // 2. BLOQUEIO: Se for USER, barra o acesso e recarrega com erro
        if (userRole === "USER") {
          redirect("/?error=no_admin");
        }

        // 3. Se for ADMIN ou TECNICO, prossegue com a sessão
        const cookieStore = await cookies();
        const oneMonth = 60 * 60 * 24 * 30;

        cookieStore.set("session", response.data.token, { 
          maxAge: oneMonth, 
          path: "/",
          httpOnly: true, 
          secure: process.env.NODE_ENV === "production" 
        });
        
        cookieStore.set("role", userRole, { maxAge: oneMonth, path: "/" });

        // 4. Redirecionamento por Perfil Permitido
        if (userRole === "ADMIN") {
          redirect("/dashboard/ticketscount");
        } else if (userRole === "TECNICO") {
          redirect("/dashboard/tickets");
        }
      }
    } catch (err: any) {
      // Importante: Não capture o erro de redirect do Next.js
      if (isRedirectError(err)) throw err;
      
      console.log("ERRO NO LOGIN:", err.response?.data || err.message);
      redirect("/?error=credentials");
    }
  }

  // Definição das mensagens baseada no parâmetro de erro da URL
  const errorMsg = error === "no_admin" 
    ? "Acesso negado: Este portal é exclusivo para Administradores e Técnicos." 
    : error === "credentials" 
    ? "E-mail ou senha incorretos." 
    : null;

  return (
    <div className={styles.container}>
      <div className={styles.conteiner}>
        <section className={styles.login}>
          <Image src={logoImg} alt="Logo" width={200} height={100} priority />
          <h1>Portal Administrativo</h1>

          {errorMsg && (
            <p style={{ 
              color: '#FF3F4B', 
              fontWeight: 'bold', 
              marginBottom: '15px', 
              textAlign: 'center',
              backgroundColor: 'rgba(255, 63, 75, 0.1)',
              padding: '10px',
              borderRadius: '4px',
              fontSize: '14px',
              border: '1px solid rgba(255, 63, 75, 0.2)'
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