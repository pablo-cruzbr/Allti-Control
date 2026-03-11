import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/api";
import TicketsList from "./TicketsList";
import { OrdemdeServicoResponseData } from "@/lib/getOrdemdeServico.type";
import { cookies } from "next/headers"; // Importação necessária para ler a role
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

async function getTickets(token: string | null): Promise<OrdemdeServicoResponseData> {
  try {
    const response = await api.get('/listordemdeservico', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data || { 
      controles: [], 
      total: 0, 
      totalAberta: 0, 
      totalConcluida: 0, 
      totalEmAndamento: 0 
    };

  } catch (err) {
    console.error("Erro ao buscar tickets no servidor:", err);
    return {
      controles: [], 
      total: 0, 
      totalAberta: 0, 
      totalPausada: 0, 
      totalConcluida: 0, 
      totalEmAndamento: 0,
      totalTicket: 0,
      totalOrdemdeServico: 0 
    }; 
  }
}

export default async function TicketsPage() {
  const token = await getCookieServer();
  
  // 1. Verificação de Role (Cadeado do Servidor)
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value;

  if (role !== "ADMIN") {
    // Se não for ADMIN, redireciona imediatamente para a lista simples
    redirect("/dashboard/tickets");
  }

  // 2. Busca os dados apenas se for ADMIN
  const ticketsData = await getTickets(token);

  return (
    <TicketsList 
      ticketsData={ticketsData} 
      tokenDoServidor={token ?? ""} 
    />
  );
}