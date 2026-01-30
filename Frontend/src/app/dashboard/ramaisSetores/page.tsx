import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/api";
import RamaisSetoresList from "./RamaisSetoresList";
import { RamaisSetoresProps } from "@/lib/getRamaisSetores.type";
export const dynamic = 'force-dynamic';
async function getRamaisSetores(): Promise<RamaisSetoresProps[]> {
  try {
    const token = await getCookieServer();
    const response = await api.get('/listinformacoessetor', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data || [];

  } catch (err) {
    console.error(err);
    return [];
  }
}


export default async function TicketsPage() {
  const ramaisData = await getRamaisSetores();

  return (
    <RamaisSetoresList ramaisData={ramaisData} />
  );
}
