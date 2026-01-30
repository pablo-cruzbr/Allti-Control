import { getCookieServer } from '@/lib/cookieServer';
import { api } from '@/services/api';
import AssistenciaTecnicaWrapper from './AssistenciaTecnicaWrapper';
import { AssistenciaTecnicaResponse } from '@/lib/getAssistenciaTecnica.type';
export const dynamic = 'force-dynamic';
async function getAssistenciaTecnica(): Promise<AssistenciaTecnicaResponse> {
  try {
    const token = await getCookieServer();
    const response = await api.get('/listcontroledeassistenciatecnica', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data || {
      controles: [],
      total: 0,
      totalAguardandoReparo: 0,
      totalFinalizado: 0,
    };
  } catch (err) {
    console.error(err);
    return {
      controles: [],
      total: 0,
      totalAguardandoReparo: 0,
      totalFinalizado: 0,
    };
  }
}

export default async function ComprasPage() {
  const assistenciaData = await getAssistenciaTecnica();

  return <AssistenciaTecnicaWrapper assistenciaData={assistenciaData} />;
}
