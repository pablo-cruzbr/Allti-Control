import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/api";
import { SetoresProps } from "@/lib/getSetores.type";
import SetoresList from "./setoresList";
export const dynamic = 'force-dynamic';
async function getSetores(): Promise<SetoresProps[]> {
  try {
    const token = await getCookieServer();
    const response = await api.get('/listsetores', {
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
  const setoresData = await getSetores();

  return (
    <SetoresList setoresData={setoresData} />
  );
}
