'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { api } from "@/services/api";
import styles from '../modalCardCompras/editForm.module.scss';
import { EstabilizadoresProps } from "@/lib/getEstabilizadores.type";
import { getCookieClient } from "@/lib/cookieClient";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaRegSave } from "react-icons/fa";

type Status = { id: string; name: string };
type Instituicoes = { id: string; name: string };
type Estabilizadores = { id: string; name: string; patrimonio: string };

type Props = {
  documentacaoTecnica: EstabilizadoresProps;
  onClose: () => void;
};

export default function EditEstabilizadoresForm({ documentacaoTecnica, onClose }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    problema: "",
    observacoes: "",
    osdaAssistencia: "",
    datadeChegada: "",
    datadeRetirada: "",
    statusEstabilizadores_id: "",
    instituicaoUnidade_id: "",
    estabilizadores_id: ""
  });

  const [statusList, setStatusList] = useState<Status[]>([]);
  const [instituicaoUnidadeList, setInstituicoesList] = useState<Instituicoes[]>([]);
  const [estabilizadoresList, setEstabilizadoresList] = useState<Estabilizadores[]>([]);
  const [listsLoaded, setListsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getCookieClient();

        const [statusRes, instituicoesRes, estabilizadoresRes] = await Promise.all([
          api.get('/liststatus/estabilizadores', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/listinstuicao', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/list/estabilizador', { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setStatusList(Array.isArray(statusRes.data) ? statusRes.data : []);
        setInstituicoesList(Array.isArray(instituicoesRes.data.instituicoes)
          ? instituicoesRes.data.instituicoes
          : []);
        setEstabilizadoresList(Array.isArray(estabilizadoresRes.data)
          ? estabilizadoresRes.data
          : []);

        setListsLoaded(true);
      } catch (error) {
        console.error("Erro ao buscar listas:", error);
      }
    };

    fetchData();
  }, []);

  // Função para formatar a data no formato que o input de date aceita
  const formatDateForInput = (dateString?: string | null) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    return d.toISOString().split("T")[0]; // yyyy-mm-dd
  };

  useEffect(() => {
    if (listsLoaded && documentacaoTecnica) {
      setForm({
        problema: documentacaoTecnica.problema ?? "",
        observacoes: documentacaoTecnica.observacoes ?? "",
        osdaAssistencia: documentacaoTecnica.osdaAssistencia ?? "",
        datadeChegada: formatDateForInput(documentacaoTecnica.datadeChegada),
        datadeRetirada: formatDateForInput(documentacaoTecnica.datadeRetirada),
        statusEstabilizadores_id: documentacaoTecnica.statusEstabilizadores?.id ?? "",
        instituicaoUnidade_id: documentacaoTecnica.instituicaoUnidade?.id ?? "",
        estabilizadores_id: documentacaoTecnica.estabilizadores?.id ?? ""
      });
    }
  }, [listsLoaded, documentacaoTecnica]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const token = await getCookieClient();
      await api.patch(`/update/controledeestabilizadores/${documentacaoTecnica.id}`, {
        ...form,
        // garante que backend recebe ISO (se ele espera isso)
        datadeChegada: form.datadeChegada ? new Date(form.datadeChegada).toISOString() : null,
        datadeRetirada: form.datadeRetirada ? new Date(form.datadeRetirada).toISOString() : null,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Estabilizador atualizado com sucesso!");
      onClose();
      router.refresh();
    } catch (err: any) {
      console.error("Erro ao atualizar:", err?.response?.data ?? err?.message ?? String(err));
      alert("Erro ao atualizar os dados.");
    }
  };

  if (!listsLoaded) {
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
        Editar Estabilizador
      </h3>

      <p>Problema</p>
      <input type="text" name="problema" value={form.problema} onChange={handleChange} placeholder="Informe o problema" />

      <p>Observações</p>
      <textarea name="observacoes" value={form.observacoes} onChange={handleChange} placeholder="Observações" rows={4} />

      <p>OS da Assistência</p>
      <input type="text" name="osdaAssistencia" value={form.osdaAssistencia} onChange={handleChange} placeholder="Número da OS" />

      <p>Data de Chegada</p>
      <input type="date" name="datadeChegada" value={form.datadeChegada} onChange={handleChange} />

      <p>Data de Retirada</p>
      <input type="date" name="datadeRetirada" value={form.datadeRetirada} onChange={handleChange} />

      <p>Status</p>
      <select name="statusEstabilizadores_id" value={form.statusEstabilizadores_id} onChange={handleChange}>
        <option value="">Selecione o status</option>
        {statusList.map(status => (
          <option key={status.id} value={status.id}>{status.name}</option>
        ))}
      </select>

      <p>Instituição Unidade</p>
      <select name="instituicaoUnidade_id" value={form.instituicaoUnidade_id} onChange={handleChange}>
        <option value="">Selecione a instituição</option>
        {instituicaoUnidadeList.map(inst => (
          <option key={inst.id} value={inst.id}>{inst.name}</option>
        ))}
      </select>

      <p>Estabilizadores</p>
      <select name="estabilizadores_id" value={form.estabilizadores_id} onChange={handleChange}>
        <option value="">Selecione o Estabilizador</option>
        {estabilizadoresList.map(est => (
          <option key={est.id} value={est.id}> {est.patrimonio} - {est.name} </option>
        ))}
      </select>

      <div className={styles.buttonArea}>
        <button onClick={handleSubmit}>
          <FaRegSave className={styles.iconButton} />
          Salvar
        </button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}
