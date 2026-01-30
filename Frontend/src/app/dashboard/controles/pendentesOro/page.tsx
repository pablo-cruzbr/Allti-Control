// app/dashboard/compras/page.tsx
import { getCookieServer } from '@/lib/cookieServer';
import { api } from '@/services/api';
import { MaquinasPendentesOroProps, MaquinasPendentesLabPropsResponse } from '@/lib/getMaquinasPendentesOro.type';
import PendentesOroList from '../pendentesOro/PendentesOroList';
export const dynamic = 'force-dynamic';

async function getMaquinasPendentesOro(): Promise<MaquinasPendentesLabPropsResponse> {
  try {
    const token = await getCookieServer();
    const response = await api.get('/listcontroledemaquinaspendentesoro', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response)
    return response.data || {
       controles: [],
        total: 0,
        totalAguardandoRetirada: 0,
        totalDescartada: 0,
        totalDisponivel: 0,
        totalEmManutencao: 0,
        totalInstalada: 0,
    };
    
  } catch (err) {
    console.error(err);
    return {
        controles: [],
        total: 0,
        totalAguardandoRetirada: 0,
        totalDescartada: 0,
        totalDisponivel: 0,
        totalEmManutencao: 0,
        totalInstalada: 0,
    }
  }
}

export default async function ComprasPage() {
  const MaquinasPendentesLabPropsData = await getMaquinasPendentesOro();
  return <PendentesOroList MaquinasPendentesLabPropsData={MaquinasPendentesLabPropsData} />;
}
