'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { api } from "@/services/api";
import styles from '../modalCardCompras/editForm.module.scss';
import { getCookieClient } from "@/lib/cookieClient";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaRegSave } from "react-icons/fa";
import { ClientesMunicipaisProps } from "@/lib/getClientesMunicipais.type";

type Props = {
  instituicao: ClientesMunicipaisProps; 
  onClose: () => void;
};

export default function EditClienteMunicipalForm({ instituicao, onClose }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    endereco: '',
    telefone: '',
    tipodeInstituicaoUnidade_id: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (instituicao) {
      setForm({
        name: instituicao.name ?? '',
        endereco: instituicao.endereco ?? '',
        telefone: instituicao.telefone ?? '',
        tipodeInstituicaoUnidade_id: instituicao.tipodeinstituicaoUnidade?.id ?? '',
      });
      setLoading(false);
    }
  }, [instituicao]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!instituicao?.id) {
      alert("Erro interno: ID da instituição ausente.");
      return;
    }

    try {
      const token = await getCookieClient();
      
      const data = {
        id: instituicao.id, 
        name: form.name,
        endereco: form.endereco,
        telefone: form.telefone,
        tipodeInstituicaoUnidade_id: form.tipodeInstituicaoUnidade_id
      };

      await api.patch(`/instituicaounidade/${instituicao.id}`, data, {
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
        Editar Unidade Municipal
      </h3>

      <div className={styles.fieldGroup}>
        <label>Nome da Unidade / Escola</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label>Endereço</label>
        <textarea
          name="endereco"
          value={form.endereco}
          onChange={handleChange}
          rows={3}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label>Telefone</label>
        <textarea
          name="telefone"
          value={form.telefone}
          onChange={handleChange}
          placeholder="11-0000-0000"
          rows={3}
        />
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