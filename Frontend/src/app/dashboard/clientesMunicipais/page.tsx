import { getCookieServer } from '@/lib/cookieServer';
import { api } from '@/services/api';
import ClienteMunicipalList from './ClienteMunicipalList';
import { ClientesMunicipaisProps, ClienteMunicipaisResponse } from '@/lib/getClientesMunicipais.type';
export const dynamic = 'force-dynamic';
async function getClientes(): Promise<ClienteMunicipaisResponse> {
  try {
    const token = await getCookieServer();
    const response = await api.get('/listinstuicao', {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log('/listinstuicao response.data:', response.data);

    const instituicoes: ClientesMunicipaisProps[] = response.data?.instituicoes ?? [];

    return {
      controles: instituicoes,
      total: response.data?.total ?? instituicoes.length,
    };

  } catch (err) {
    console.error(err);
    return {
      controles: [],
      total: 0
    };
  }
}


export default async function ClientesPage() {
  const clienteData = await getClientes();
  return <ClienteMunicipalList clienteData={clienteData} />;
}
