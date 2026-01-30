// app/dashboard/compras/page.tsx
import { getCookieServer } from '@/lib/cookieServer';
import { api } from '@/services/api';
import LaboratorioList from './LaboratorioList';
import { LaboratorioResponse } from '@/lib/getLaboratorio.type';
export const dynamic = 'force-dynamic';
async function getLaboratorio(): Promise<LaboratorioResponse> {
  try {
    const token = await getCookieServer();
    const response = await api.get('/listcontroledelaboratorio', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response)
    return response.data || {
      controles: [],
      total: 0,
      totalAguardandoConserto: 0,
      totalAguardandoDevolucao: 0,
      totalAguardandoOSdeLaboratorio: 0,
    };
    
  } catch (err) {
    console.error(err);
    return {
      controles: [],
      total: 0,
      totalAguardandoConserto: 0,
      totalAguardandoDevolucao: 0,
      totalAguardandoOSdeLaboratorio: 0,
    };
  }
}

export default async function ComprasPage() {
  const laboratorioData = await getLaboratorio();
  return <LaboratorioList laboratorioData={laboratorioData} />;
}
