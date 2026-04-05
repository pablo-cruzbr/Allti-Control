'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { api } from "@/services/api";
import styles from '../modalCardCompras/editForm.module.scss';
import { EquipamentoProps } from "@/lib/getEquipamento.type";
import { getCookieClient } from "@/lib/cookieClient";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaRegSave } from "react-icons/fa";
import Select from 'react-select';

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

  // Mapeia a lista para o formato do React Select
  const options = instituicoesList.map(inst => ({
    value: inst.id,
    label: inst.name
  }));

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption: any) => {
    setForm(prev => ({
      ...prev,
      instituicaoUnidade_id: selectedOption ? selectedOption.value : ""
    }));
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
    <Select
      instanceId="instituicao-select"
      options={options}
      placeholder="Selecione a unidade..."
      noOptionsMessage={() => "Nenhuma unidade encontrada"}
      value={options.find(opt => opt.value === form.instituicaoUnidade_id) || null}
      onChange={handleSelectChange}
      isSearchable={true}
      className={styles.selectContainer}
      styles={{
        control: (base, state) => ({
          ...base,
          backgroundColor: '#fff',
          borderRadius: '10px',
          borderColor: state.isFocused ? '#4E3182' : '#ddd',
          boxShadow: 'none',
          '&:hover': { borderColor: '#4E3182' }
        }),
        menu: (base) => ({
          ...base,
          zIndex: 9999,
          backgroundColor: '#fff'
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isSelected 
            ? '#4E3182' 
            : state.isFocused 
            ? '#f3effa' 
            : '#fff',
          color: state.isSelected 
            ? '#fff' 
            : '#4B4B4B', 
          cursor: 'pointer',
          padding: '10px 15px',
          '&:active': { backgroundColor: '#4E3182' }
        }),
        singleValue: (base) => ({
          ...base,
          color: '#4B4B4B'
        }),
        input: (base) => ({
          ...base,
          color: '#4B4B4B' 
        }),
        placeholder: (base) => ({
          ...base,
          color: '#999'
        })
      }}
    />

      <div className={styles.buttonArea}>
        <button onClick={handleSubmit} className={styles.buttonBuy}>
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