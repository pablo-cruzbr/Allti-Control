'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { api } from "@/services/api";
import styles from '../modalCardCompras/editForm.module.scss';
import { getCookieClient } from "@/lib/cookieClient";
import { UsuariosProps } from "@/lib/getUsuario.type";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaRegSave } from "react-icons/fa";

type Props = {
  dados: UsuariosProps; 
  onClose: () => void;
};

export default function EditUsuariosForm({ dados, onClose }: Props) {
  const router = useRouter();

  const [clientes, setClientes] = useState<{id: string, name: string}[]>([]);
  const [instituicoes, setInstituicoes] = useState<{id: string, name: string}[]>([]);
  const [setores, setSetores] = useState<{id: string, name: string}[]>([]);

  // Estado do formulário baseado na UsuariosProps
  const [form, setForm] = useState({
    name: '',
    email: '',
    setorId: '',
    clienteId: '',
    instituicaoUnidadeId: '',
  });

  const [loading, setLoading] = useState(true);

  // Unificação da busca de opções (Clientes, Instituições e Setores)
  useEffect(() => {
    async function loadOptions() {
      try {
        setLoading(true);
        const token = getCookieClient();
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [resClientes, resInstituicoes, resSetores] = await Promise.all([
          api.get('/listcliente', config),
          api.get('/listinstuicao', config),
          api.get('/listsetores', config)
        ]);

        if (resClientes.data) setClientes(resClientes.data.controles || resClientes.data);
        if (resInstituicoes.data) setInstituicoes(resInstituicoes.data.instituicoes || resInstituicoes.data);
        if (resSetores.data) setSetores(resSetores.data);

      } catch (err) {
        console.error("Erro ao carregar listas para o select:", err);
      } finally {
        setLoading(false);
      }
    }

    loadOptions();
  }, []);

  useEffect(() => {
    if (dados) {
      setForm({
        name: dados.name ?? '',
        email: dados.email ?? '',
        setorId: dados.setor?.id ?? '',
        clienteId: dados.cliente?.id ?? '',
        instituicaoUnidadeId: dados.instituicaoUnidade?.id ?? '',
      });
    }
  }, [dados]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async () => {
  if (!dados?.id) return;

  try {
    const token = getCookieClient();
    
    // Garanta que se o ID for uma string vazia, ele envie null
    const payload = {
      name: form.name,
      email: form.email,
      // Se form.setorId for "" (vazio), o Prisma quebra a chave estrangeira
      setor_id: form.setorId || null, 
      cliente_id: form.clienteId || null,
      instituicaoUnidade_id: form.instituicaoUnidadeId || null
    };

    await api.patch(`/user/update/${dados.id}`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });

    router.refresh(); 
    onClose();

  } catch (err: any) {
    const errorMessage = err.response?.data?.error || "Erro desconhecido";
    console.error("ERRO DO PRISMA NO BACKEND:", errorMessage);
    alert(`Erro ao atualizar: Verifique se o Setor selecionado é válido.`);
  }
};

  if (loading) return <div className={styles.editForm}><p>Carregando opções...</p></div>;

  return (
    <div className={styles.editForm}>
      <h3>
        <HiOutlinePencilSquare className={styles.icon} />
        Editar Usuário
      </h3>

      <div className={styles.fieldGroup}>
        <label>Nome do Usuário</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label>E-mail</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label>Setor</label>
        <select name="setorId" value={form.setorId} onChange={handleChange}>
          <option value="">Selecione um setor</option>
          {setores.map(setor => (
            <option key={setor.id} value={setor.id}>{setor.name}</option>
          ))}
        </select>
      </div>

      <div className={styles.fieldGroup}>
        <label>Cliente / Empresa</label>
        <select name="clienteId" value={form.clienteId} onChange={handleChange}>
          <option value="">Selecione um cliente</option>
          {clientes.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className={styles.fieldGroup}>
        <label>Instituição / Unidade</label>
        <select name="instituicaoUnidadeId" value={form.instituicaoUnidadeId} onChange={handleChange}>
          <option value="">Selecione uma instituição</option>
          {instituicoes.map(i => (
            <option key={i.id} value={i.id}>{i.name}</option>
          ))}
        </select>
      </div>

      <div className={styles.buttonArea}>
        <button className={styles.btnSave} onClick={handleSubmit}>
          <FaRegSave className={styles.iconButton} />
          Salvar Alterações
        </button>
        <button className={styles.btnCancel} onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
}