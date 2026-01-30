import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/api";
import TicketsList from "./TicketsList";
import { OrdemdeServicoProps, OrdemdeServicoResponseData } from "@/lib/getOrdemdeServico.type";
export const dynamic = 'force-dynamic';
async function getTickets(): Promise<OrdemdeServicoResponseData> {
  try {
    const token = await getCookieServer();
    const response = await api.get('/listordemdeservico', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data || { controles: [], total: 0, totalAberta: 0, totalConcluida: 0, totalEmAndamento: 0 };

  } catch (err) {
    console.error(err);
    return {
      controles: [], 
      total: 0, 
      totalAberta: 0, 
      totalPausada: 0, 
      totalConcluida: 0, 
      totalEmAndamento: 0,
      totalTicket: 0,
      totalOrdemdeServico: 0 }; 
  }
}

export default async function TicketsPage() {
  const ticketsData = await getTickets();

  return (
    <TicketsList ticketsData={ticketsData} />
  );
}
