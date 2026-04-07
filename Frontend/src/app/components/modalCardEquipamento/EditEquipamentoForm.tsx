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

type Instituicao = { id: string; name: string; endereco: string };
type tipodeEquipamento = { id: string; name: string };

type Props = {
  equipamento: EquipamentoProps;
  onClose: () => void;
};

export default function EditEquipamentoForm({ equipamento, onClose }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    patrimonio: "",
    instituicaoUnidade_id: "",
    tipo_id: "" 
  });

  const [instituicoesList, setInstituicoesList] = useState<Instituicao[]>([]);
  const [tipodeEquipamentoList, setTipodeEquipamentoList] = useState<tipodeEquipamento[]>([]);
  const [listsLoaded, setListsLoaded] = useState(false);

  const customSelectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      backgroundColor: '#fff',
      borderRadius: '10px',
      borderColor: state.isFocused ? '#4E3182' : '#ddd',
      boxShadow: 'none',
      marginBottom: '1rem',
      '&:hover': { borderColor: '#4E3182' }
    }),
    menu: (base: any) => ({
      ...base,
      zIndex: 9999,
      backgroundColor: '#fff'
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected ? '#4E3182' : state.isFocused ? '#f3effa' : '#fff',
      color: state.isSelected ? '#fff' : '#4B4B4B',
      cursor: 'pointer',
      padding: '10px 15px',
      '&:active': { backgroundColor: '#4E3182' }
    }),
    singleValue: (base: any) => ({ ...base, color: '#4B4B4B' }),
    input: (base: any) => ({ ...base, color: '#4B4B4B' }),
    placeholder: (base: any) => ({ ...base, color: '#999' })
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getCookieClient();
        const [instituicoesRes, tiposRes] = await Promise.all([
          api.get('/listinstuicao', {
            headers: { Authorization: `Bearer ${token}` }
          }).catch(err => {
            console.error("Erro ao carregar instituições:", err);
            return { data: { instituicoes: [] } };
          }),
          api.get('/list/tipo/equipamento', {
            headers: { Authorization: `Bearer ${token}` }
          }).catch(err => {
            console.warn("Rota de tipos não encontrada ou erro (404 provável na Vercel):", err);
            return { data: [] }; 
          })
        ]);

        setInstituicoesList(Array.isArray(instituicoesRes.data.instituicoes)
          ? instituicoesRes.data.instituicoes
          : []);

        setTipodeEquipamentoList(Array.isArray(tiposRes.data)
          ? tiposRes.data
          : tiposRes.data.tipos || []);

      } catch (error) {
        console.error("Erro crítico ao buscar dados:", error);
      } finally {
        setListsLoaded(true);
      }
    };

    fetchData();
  }, []);

 useEffect(() => {
  if (listsLoaded && equipamento) {
    setForm({
      name: equipamento.name ?? "",
      patrimonio: equipamento.patrimonio ?? "",
      instituicaoUnidade_id: equipamento.instituicaoUnidade?.id ?? "",
      tipo_id: equipamento.tipodeEquipamento?.id ?? "" 
    });
  }
}, [listsLoaded, equipamento]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const token = await getCookieClient();
      await api.patch(`/equipamento/${equipamento.id}`, {
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
        placeholder="Selecione a unidade..."
        options={instituicoesList.map(inst => ({ value: inst.id, label: inst.name }))}
        value={instituicoesList.filter(inst => inst.id === form.instituicaoUnidade_id).map(inst => ({ value: inst.id, label: inst.name }))[0] || null}
        onChange={(opt) => setForm(prev => ({ ...prev, instituicaoUnidade_id: opt ? opt.value : "" }))}
        isSearchable
        styles={customSelectStyles}
      />

      <p>Tipo do Equipamento</p>
      <Select
        instanceId="tipo-select"
        placeholder="Selecione o tipo..."
        noOptionsMessage={() => "Nenhum tipo encontrado"}
        options={tipodeEquipamentoList.map(tipo => ({ value: tipo.id, label: tipo.name }))}
        value={tipodeEquipamentoList.filter(tipo => tipo.id === form.tipo_id).map(tipo => ({ value: tipo.id, label: tipo.name }))[0] || null}
        onChange={(opt) => setForm(prev => ({ ...prev, tipo_id: opt ? opt.value : "" }))}
        isSearchable
        styles={customSelectStyles}
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