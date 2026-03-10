import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/api";
import TicketsList from "./TicketsList";
import { OrdemdeServicoResponseData } from "@/lib/getOrdemdeServico.type";

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
  const ticketsData = await getTickets(token);
  return (
    <TicketsList 
      ticketsData={ticketsData} 
      tokenDoServidor={token ?? ""} 
    />
  );
}