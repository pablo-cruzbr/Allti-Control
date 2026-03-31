'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { api } from "@/services/api";
import styles from '../modalCardCompras/editForm.module.scss';
import { getCookieClient } from "@/lib/cookieClient";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaRegSave } from "react-icons/fa";

type Props = {
  cliente: {
    id: string;
    name: string;
    endereco: string;
    telefone: string;
    cnpj: string;
    created_at: string;
  };
  onClose: () => void;
};

export default function EditClienteForm({ cliente, onClose }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    cnpj: '',
    endereco: '',
    telefone: ''
  });

  const [loading, setLoading] = useState(true);

  // Preencher o formulário assim que o componente abrir
  useEffect(() => {
    if (cliente) {
      setForm({
        name: cliente.name ?? '',
        cnpj: cliente.cnpj ?? '',
        endereco: cliente.endereco ?? '',
        telefone: cliente.telefone ?? ''
      });
      setLoading(false);
    }
  }, [cliente]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async () => {
  if (!cliente?.id) {
    alert("Erro interno: ID do cliente ausente.");
    return;
  }

  try {
    const token = await getCookieClient();
    
    const data = {
      name: form.name,
      cnpj: form.cnpj,
      endereco: form.endereco,
      telefone: form.telefone
    };

    await api.patch(`/cliente/${cliente.id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });

    router.refresh(); 
    onClose();

  } catch (err: any) {
    const errorMsg = err?.response?.data?.error || err?.message || "Erro desconhecido";
    alert(`Erro ao atualizar: ${errorMsg}`);
  }
};

  if (loading) {
    return (
      <div className={styles.editForm}>
        <p>Carregando dados...</p>
      </div>
    );
  }

  return (
    <div className={styles.editForm}>
      <h3>
        <HiOutlinePencilSquare className={styles.icon} />
        Editar Cadastro de Cliente
      </h3>

      <div className={styles.fieldGroup}>
        <label>Nome do Cliente / Razão Social</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Ex: Nome da Empresa Ltda"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label>CNPJ</label>
        <input
          type="text"
          name="cnpj"
          value={form.cnpj}
          onChange={handleChange}
          placeholder="00.000.000/0000-00"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label>Endereço Completo</label>
        <textarea
          name="endereco"
          value={form.endereco}
          onChange={handleChange}
          placeholder="Rua, Número, Bairro, Cidade - UF"
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