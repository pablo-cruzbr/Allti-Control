// app/dashboard/compras/page.tsx

import { getCookieServer } from '@/lib/cookieServer';
import { api } from '@/services/api';
import UsuarioList from './UsuarioList';
import { UsuariosPropsResponse } from '@/lib/getUsuario.type';
export const dynamic = 'force-dynamic';
async function getUsuarios(): Promise<UsuariosPropsResponse> {
  try {
    const token = await getCookieServer();

    const response = await api.get('/listusers', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    return {
      controles: data.users ?? data.controles ?? [], 
      total: data.total ?? data.count ?? 0,
    };
  } catch (err) {
    console.error('Erro ao Buscar Usuários', err);
    return {
      controles: [],
      total: 0,
    };
  }
}

export default async function ComprasPage() {
  const usuariosData = await getUsuarios();
  return <UsuarioList usuariosData={usuariosData} />;
}
