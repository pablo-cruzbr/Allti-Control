import { getCookieServer } from '@/lib/cookieServer';
import { api } from '@/services/api';
import ComprasList from './ComprasList';
import { ComprasResponse } from '@/lib/getCompras.type';
export const dynamic = 'force-dynamic';
async function getCompras(): Promise<ComprasResponse | null> {
  try {
    const token = await getCookieServer();
    const response = await api.get('/listsolicitacaodecompras', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data || {
      controles: [],
      total: 0,
      totalAguardandoCompra: 0,
      totalAguardandoEntrega: 0,
      totalCompraFinalizada: 0
    };
  } catch (err) {
    console.error("Erro ao buscar compras:", err);
    return{
      controles: [],
      total: 0,
      totalAguardandoCompra: 0,
      totalAguardandoEntrega: 0,
      totalCompraFinalizada: 0
    }
    return null;
  }
}

export default async function ComprasPage() {
  const comprasData = await getCompras();

  return <ComprasList comprasData={comprasData ?? undefined} />;
}
