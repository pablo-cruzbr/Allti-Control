'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { api } from "@/services/api";
import styles from '../modalCardCompras/editForm.module.scss';
import { AssistenciaTecnicaProps } from "@/lib/getAssistenciaTecnica.type";
import { getCookieClient } from "@/lib/cookieClient";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaRegSave } from "react-icons/fa";
import axios from 'axios';

type Equipamentos = { id: string; name: string; patrimonio: string };
type StatusReparo = { id: string; name: string };
type Tecnicos = { id: string; name: string };
type Clientes = { id: string; name: string };
type Instituicoes = { id: string; name: string; endereco: string };

type Props = {
  assistenciaTecnica: AssistenciaTecnicaProps;
  onClose: () => void;
};

export default function EditAssistenciaTecnicaForm({ assistenciaTecnica, onClose }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    mesAno: '',
    idChamado: '',
    assistencia: '',
    observacoes: '',
    osDaAssistencia: '',
    dataDeRetirada: '',
    equipamento_id: '',
    cliente_id: '',
    tecnico_id: '',
    instituicaoUnidade_id: '',
  });

  const [statusList, setStatusList] = useState<StatusReparo[]>([]);
  const [equipamentoList, setEquipamentoList] = useState<Equipamentos[]>([]);
  const [tecnicosList, setTecnicosList] = useState<Tecnicos[]>([]);
  const [clientesList, setClientesList] = useState<Clientes[]>([]);
  const [instituicaoUnidadeList, setInstituicaoUnidadeList] = useState<Instituicoes[]>([]);
  
  const [listsLoaded, setListsLoaded] = useState(false);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const token = await getCookieClient();
        const [tecnicos, instituicoes, clientes, status, equipamentos] = await Promise.all([
          api.get('/listtecnico', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/listinstuicao', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/listcliente', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/liststatusreparo', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/listequipamento', { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setTecnicosList(tecnicos.data.controles);
        setInstituicaoUnidadeList(Array.isArray(instituicoes.data.instituicoes) ? instituicoes.data.instituicoes : []);
        setClientesList(clientes.data.controles);
        setStatusList(status.data);
        setEquipamentoList(equipamentos.data);
        setListsLoaded(true);
      } catch (error) {
        console.error('Erro ao buscar listas:', error);
      }
    };
    fetchLists();
  }, []);

  useEffect(() => {
    if (listsLoaded && assistenciaTecnica) {
      setForm({
        name: assistenciaTecnica.name ?? '',
        mesAno: assistenciaTecnica.mesAno?.slice(0,7) ?? '', // yyyy-MM
        idChamado: assistenciaTecnica.idChamado ?? '',
        assistencia: assistenciaTecnica.assistencia ?? '',
        observacoes: assistenciaTecnica.observacoes ?? '',
        osDaAssistencia: assistenciaTecnica.osDaAssistencia ?? '',
        dataDeRetirada: assistenciaTecnica.dataDeRetirada?.slice(0,10) ?? '',
        equipamento_id: assistenciaTecnica.equipamento?.id ?? '',
        cliente_id: assistenciaTecnica.cliente?.id ?? '',
        tecnico_id: assistenciaTecnica.tecnico?.id ?? '',
        instituicaoUnidade_id: assistenciaTecnica.instituicaoUnidade?.id ?? '',
      });
    }
  }, [listsLoaded, assistenciaTecnica]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async () => {
  try {
    const token = await getCookieClient();

    // força hora no meio do dia UTC
    let dataDeRetiradaISO = form.dataDeRetirada
      ? new Date(`${form.dataDeRetirada}T12:00:00Z`).toISOString()
      : null;

    let mesAnoISO = form.mesAno
      ? new Date(`${form.mesAno}-01T12:00:00Z`).toISOString()
      : null;

    await api.patch(
      `assistenciatecnica/update/${assistenciaTecnica.id}`,
      {
        ...form,
        mesAno: mesAnoISO,
        dataDeRetirada: dataDeRetiradaISO,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Card atualizado com sucesso!");
    onClose();
    router.refresh();
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      console.error("Erro Axios:", err.response?.data || err.message);
    } else {
      console.error("Erro genérico:", err);
    }
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
        Editar Card
      </h3>

      <p>Título</p>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Insira o Nome"
      />

      <p>Mês/Ano</p>
      <input
        type="month"
        name="mesAno"
        value={form.mesAno}
        onChange={handleChange}
        placeholder="Mês/Ano"
      />

      <p>Data de Retirada</p>
      <input
        type="date"
        name="dataDeRetirada"
        value={form.dataDeRetirada ? form.dataDeRetirada.slice(0, 10) : ''}
        onChange={handleChange}
        placeholder="Data de Retirada"
      />

      <p>ID Chamado</p>
      <input
        name="idChamado"
        value={form.idChamado}
        onChange={handleChange}
        placeholder="Insira o ID do chamado"
      />

      <p>Assistência</p>
      <input
        name="assistencia"
        value={form.assistencia}
        onChange={handleChange}
        placeholder="Insira o nome da assistência"
      />

      <p>Observações</p>
      <textarea
        name="observacoes"
        value={form.observacoes}
        onChange={handleChange}
        placeholder="Observações"
      />

      <p>Cliente</p>
      <select
        name="cliente_id"
        value={form.cliente_id}
        onChange={handleChange}
        className={styles.input}
        required
      >
        <option value="">Selecione o cliente</option>
        {clientesList.map((cliente) => (
          <option key={cliente.id} value={cliente.id}>
            {cliente.name}
          </option>
        ))}
      </select>

      <p>Técnico</p>
      <select
        name="tecnico_id"
        value={form.tecnico_id}
        onChange={handleChange}
        className={styles.input}
        required
      >
        <option value="">Selecione o técnico</option>
        {tecnicosList.map((tecnico) => (
          <option key={tecnico.id} value={tecnico.id}>
            {tecnico.name}
          </option>
        ))}
      </select>

      <p>Instituição Unidade</p>
      <select
        name="instituicaoUnidade_id"
        value={form.instituicaoUnidade_id}
        onChange={handleChange}
        className={styles.input}
      >
        <option value="">Selecione a instituição</option>
        {instituicaoUnidadeList.map((instituicao) => (
          <option key={instituicao.id} value={instituicao.id}>
            {instituicao.name}
          </option>
        ))}
      </select>

      <p>Equipamento</p>
      <select
        name="equipamento_id"
        value={form.equipamento_id}
        onChange={handleChange}
        className={styles.input}
      >
        <option value="">Selecione o equipamento</option>
        {equipamentoList.map((equipamento) => (
          <option key={equipamento.id} value={equipamento.id}>
          {equipamento.patrimonio} - {equipamento.name} 
          </option>
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
