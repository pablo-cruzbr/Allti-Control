// app/dashboard/compras/page.tsx
import { getCookieServer } from '@/lib/cookieServer';
import { api } from '@/services/api';
import PendentesLaboratorioList from './PendenteslaboratorioList';
import { MaquinasPendentesLabProps, MaquinasPendentesLabResponse } from '@/lib/getMaquinasPendentesLab.type';
export const dynamic = 'force-dynamic';
async function getMaquinasPendentesLab(): Promise<MaquinasPendentesLabResponse> {
  try {
    const token = await getCookieServer();
    const response = await api.get('/listcontroledemaquinaspendenteslab', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response)
    return response.data || {
      controles: [],
      total: 0,
      totalPendenteOro: 0,
      totalSubstituta: 0,
    }
    
  } catch (err) {
    console.error(err);
    return {
      controles: [],
      total: 0,
      totalPendenteOro: 0,
      totalSubstituta: 0,
    };
  }
}

export default async function ComprasPage() {
  const  MaquinasPendentesLabData = await getMaquinasPendentesLab();
  return <PendentesLaboratorioList  MaquinasPendentesLabData={ MaquinasPendentesLabData} />;
}
