// app/dashboard/compras/page.tsx
import { getCookieServer } from '@/lib/cookieServer';
import { api } from '@/services/api';
import LaudoTecnicoList from './LaudoTecnicoList';
import { LaudoTecnicoProps } from '@/lib/getLaudoTecnico.type';
export const dynamic = 'force-dynamic';
async function getLaudoTecnico(): Promise<LaudoTecnicoProps[]> {
  try {
    const token = await getCookieServer();
    const response = await api.get('/listcontroledelaudotecnico', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response)
    return response.data || [];
    
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default async function ComprasPage() {
  const LaudoTecnico = await getLaudoTecnico();
  return <LaudoTecnicoList LaudoTecnico={LaudoTecnico} />;
}
