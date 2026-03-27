'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { api } from "@/services/api";
import styles from '../modalCardCompras/editForm.module.scss';
import { getCookieClient } from "@/lib/cookieClient";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaRegSave } from "react-icons/fa";
import { RamaisSetoresProps } from "@/lib/getRamaisSetores.type";

type Props = {
  dados: RamaisSetoresProps; 
  onClose: () => void;
};

export default function EditRamalSetorForm({ dados, onClose }: Props) {
  const router = useRouter();
  const [clientes, setClientes] = useState<{id: string, name: string}[]>([]);
  const [instituicoes, setInstituicoes] = useState<{id: string, name: string}[]>([]);
  const [setores, setSetores] = useState<{id: string, name: string}[]>([]);
  
  const [form, setForm] = useState({
    usuario: '',
    ramal: '',
    andar: '',
    setorId: '',
    clienteId: '',
    instituicaoUnidadeId: '',
  });

  const [loading, setLoading] = useState(true);

useEffect(() => {
  async function loadOptions() {
    try {
      const token = getCookieClient();
      const [resClientes, resInstituicoes, resSetores] = await Promise.all([
        api.get('/listcliente', { headers: { Authorization: `Bearer ${token}` } }),
        api.get('/listinstuicao', { headers: { Authorization: `Bearer ${token}` } }),
        api.get('listsetores', { headers: { Authorization: `Bearer ${token}` } })
      ]);

      if (resClientes.data && resClientes.data.controles) {
        setClientes(resClientes.data.controles);
      }

      if (resInstituicoes.data && resInstituicoes.data.instituicoes) {
        setInstituicoes(resInstituicoes.data.instituicoes);
      }
      
       if (resSetores.data && resSetores.data) {
        setSetores(resSetores.data);
      }

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
        usuario: dados.usuario ?? '',
        ramal: dados.ramal ?? '',
        andar: dados.andar ?? '',
        setorId: dados.setor?.id ?? '',
        clienteId: dados.cliente?.id ?? '',
        instituicaoUnidadeId: dados.instituicaoUnidade?.id ?? '',
      });
      setLoading(false);
    }
  }, [dados]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!dados?.id) {
      alert("Erro interno: ID do registro ausente.");
      return;
    }

    try {
      const token = getCookieClient();
      
      const payload = {
        id: dados.id,
        usuario: form.usuario,
        ramal: form.ramal,
        andar: form.andar,
        setorId: form.setorId,
        clienteId: form.clienteId || null,
        instituicaoUnidadeId: form.instituicaoUnidadeId || null
      };

      await api.patch(`/informacoessetor/${dados.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      router.refresh(); 
      onClose();

    } catch (err: any) {
      const errorMsg = err?.response?.data?.error || err?.message || "Erro desconhecido";
      alert(`Erro ao atualizar: ${errorMsg}`);
    }
  };

  if (loading) return <div className={styles.editForm}><p>Carregando...</p></div>;

  return (
    <div className={styles.editForm}>
      <h3>
        <HiOutlinePencilSquare className={styles.icon} />
        Editar Informações do Setor
      </h3>

      <div className={styles.fieldGroup}>
        <label>Usuário Responsável</label>
        <input
          type="text"
          name="usuario"
          value={form.usuario}
          onChange={handleChange}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label>Ramal</label>
        <input
          type="text"
          name="ramal"
          value={form.ramal}
          onChange={handleChange}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label>Andar</label>
        <input
          type="text"
          name="andar"
          value={form.andar}
          onChange={handleChange}
        />
      </div>

         <div className={styles.fieldGroup}>
      <label>Setor Atual</label>
      <select name="setorId" value={form.setorId} onChange={handleChange}>
        <option value="">Selecione um setor</option>
        {setores.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
    </div>

      <div className={styles.fieldGroup}>
      <label>Alterar Cliente</label>
      <select name="clienteId" value={form.clienteId} onChange={handleChange}>
        <option value="">Selecione um cliente</option>
        {clientes.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
    </div>

    <div className={styles.fieldGroup}>
      <label>Alterar Instituição/Unidade</label>
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