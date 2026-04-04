'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { api } from "@/services/api";
import styles from '../modalCardCompras/editForm.module.scss';
import { EquipamentoProps } from "@/lib/getEquipamento.type";
import { getCookieClient } from "@/lib/cookieClient";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaRegSave } from "react-icons/fa";

type Instituicao = { id: string; name: string };

type Props = {
  equipamento: EquipamentoProps;
  onClose: () => void;
};

export default function EditEquipamentoForm({ equipamento, onClose }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    patrimonio: "",
    instituicaoUnidade_id: ""
  });

  const [instituicoesList, setInstituicoesList] = useState<Instituicao[]>([]);
  const [listsLoaded, setListsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getCookieClient();

        const instituicoesRes = await api.get('/listinstuicao', { 
          headers: { Authorization: `Bearer ${token}` } 
        });

        setInstituicoesList(Array.isArray(instituicoesRes.data.instituicoes)
          ? instituicoesRes.data.instituicoes
          : []);

        setListsLoaded(true);
      } catch (error) {
        console.error("Erro ao buscar lista de instituições:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (listsLoaded && equipamento) {
      setForm({
        name: equipamento.name ?? "",
        patrimonio: equipamento.patrimonio ?? "",
        instituicaoUnidade_id: equipamento.instituicaoUnidade?.id ?? ""
      });
    }
  }, [listsLoaded, equipamento]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const token = await getCookieClient();
      
      await api.patch(`/equipamento/${equipamento.id}`, {
        id: equipamento.id, 
        ...form
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Equipamento atualizado com sucesso!");
      onClose();
      router.refresh();
    } catch (err: any) {
      const errorMsg = err?.response?.data?.error || "Erro ao atualizar os dados.";
      alert(errorMsg);
    }
  };

  if (!listsLoaded) {
    return (
      <div className={styles.editForm}>
        <p>Carregando dados da unidade...</p>
      </div>
    );
  }

  return (
    <div className={styles.editForm}>
      <h3>
        <HiOutlinePencilSquare className={styles.icon} />
        Editar Equipamento
      </h3>

      <p>Nome do Equipamento</p>
      <input 
        type="text" 
        name="name" 
        value={form.name} 
        onChange={handleChange} 
        placeholder="Ex: Notebook Dell Latitude" 
      />

      <p>Patrimônio</p>
      <input 
        type="text" 
        name="patrimonio" 
        value={form.patrimonio} 
        onChange={handleChange} 
        placeholder="Número do patrimônio" 
      />

      <p>Instituição / Unidade</p>
      <select 
        name="instituicaoUnidade_id" 
        value={form.instituicaoUnidade_id} 
        onChange={handleChange}
      >
        <option value="">Selecione a unidade</option>
        {instituicoesList.map(inst => (
          <option key={inst.id} value={inst.id}>{inst.name}</option>
        ))}
      </select>

      <div className={styles.buttonArea}>
        <button onClick={handleSubmit}>
          <FaRegSave className={styles.iconButton} />
          Salvar Alterações
        </button>
        <button onClick={onClose} className={styles.buttonCancel}>
          Cancelar
        </button>
      </div>
    </div>
  );
}