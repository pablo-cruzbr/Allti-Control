'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { api } from "@/services/api";
import styles from '../modalCardCompras/editForm.module.scss';
import { LaboratorioProps } from "@/lib/getLaboratorio.type";
import { getCookieClient } from "@/lib/cookieClient";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaRegSave } from "react-icons/fa";

type Status = {
  id: string
  name: string
}

type Instituicoes = {
  id: string
  name: string
  endereco: string
}

type ClienteList = {
  id: string
  name: string
}

type Equipamentos = {
  id: string
  name: string
  patrimonio: string;
}

type Props = {
  laboratorio: LaboratorioProps;
  onClose: () => void;
};

export default function EditCardLaboratorioForm({ laboratorio, onClose }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    nomedoEquipamento: laboratorio.nomedoEquipamento ?? '',
    defeito: laboratorio.defeito ?? '',
    marca: laboratorio.marca ?? '',
    osDeAbertura: laboratorio.osDeAbertura ?? '',
    osDeDevolucao: laboratorio.osDeDevolucao ?? '',
    data_de_Chegada: laboratorio.data_de_Chegada?.slice(0, 10) ?? '', // yyyy-MM-dd
    data_de_Finalizacao: laboratorio.data_de_Finalizacao?.slice(0, 10) ?? '',
    cliente_id: laboratorio.cliente?.id ?? '',
    tecnico_id: laboratorio.tecnico?.id ?? '',
    instituicaoUnidade_id: laboratorio.instituicaoUnidade?.id ?? '',
    equipamento_id: laboratorio.equipamento?.id ?? '',
    statusControledeLaboratorio_id: laboratorio.statusControledeLaboratorio?.id ?? '',
  });

  const [clientesList, setClienteList] = useState<ClienteList[]>([])
  const [instituicaoUnidadeList,  setInstituicaoUnidadeList] = useState<Instituicoes[]>([])
  const [equipamentoList, setEquipamentoList] = useState<Equipamentos[]>([])
  const [statusList, setStatusList] = useState<Status[]>([])

  const [listsLoaded, setListsLoaded] = useState(false);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const token = await getCookieClient();

      const [instituicoes, clientes, equipamentos, status] = await Promise.all([
        api.get('/listinstuicao', { headers: { Authorization: `Bearer ${token}` }}),
        api.get('/listcliente', { headers: { Authorization: `Bearer ${token}` }}),
        api.get('/listequipamento', { headers: { Authorization: `Bearer ${token}` } }),
        api.get('/listcontrolledeLaboratorio', { headers: { Authorization: `Bearer ${token}` }}),
      ]);

      setInstituicaoUnidadeList(
        Array.isArray(instituicoes.data.instituicoes) ? instituicoes.data.instituicoes : []
      );

      setClienteList(
        Array.isArray(clientes.data) ? clientes.data : clientes.data.clientes || []
      );

      setEquipamentoList(
        Array.isArray(equipamentos.data) ? equipamentos.data : equipamentos.data.equipamentos || []
      );

      setStatusList(
        Array.isArray(status.data) ? status.data : status.data.status || []
      );

      setListsLoaded(true);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  fetchData();
}, []);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const token = await getCookieClient();

      // força hora no meio do dia para evitar mudança de fuso
      const dataChegadaISO = form.data_de_Chegada
        ? new Date(`${form.data_de_Chegada}T12:00:00Z`).toISOString()
        : null;

      const dataFinalizacaoISO = form.data_de_Finalizacao
        ? new Date(`${form.data_de_Finalizacao}T12:00:00Z`).toISOString()
        : null;

      await api.patch(
        `controledelaboratorio/update/${laboratorio.id}`,
        {
          ...form,
          data_de_Chegada: dataChegadaISO,
          data_de_Finalizacao: dataFinalizacaoISO,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Card atualizado com sucesso!");
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
        Editar Card
      </h3>

      <p>Nome do Equipamento</p>
      <input
        type="text"
        name="nomedoEquipamento"
        value={form.nomedoEquipamento}
        onChange={handleChange}
        placeholder="Insira o Nome do Equipamento"
      />

      <p>Defeito</p>
      <textarea
        name="defeito"
        value={form.defeito}
        onChange={handleChange}
        placeholder="Insira o Defeito"
        rows={4}
      />

      <p>Marca do Equipamento</p>
      <input
        type="text"
        name="marca"
        value={form.marca}
        onChange={handleChange}
        placeholder="Insira a Marca"
      />

      <p>OS de Abertura</p>
      <input
        type="text"
        name="osDeAbertura"
        value={form.osDeAbertura}
        onChange={handleChange}
        placeholder="Insira a OS de Abertura"
      />

      <p>OS de Devolução</p>
      <input
        type="text"
        name="osDeDevolucao"
        value={form.osDeDevolucao}
        onChange={handleChange}
        placeholder="Insira a OS de Devolução"
      />

      <p>Data de Chegada</p>
      <input
        type="date"
        name="data_de_Chegada"
        value={form.data_de_Chegada}
        onChange={handleChange}
      />

      <p>Data de Finalização</p>
      <input
        type="date"
        name="data_de_Finalizacao"
        value={form.data_de_Finalizacao}
        onChange={handleChange}
      />

      <p>Instituição Unidade</p>
      <select
        name="instituicaoUnidade_id"
        value={form.instituicaoUnidade_id}
        onChange={handleChange}
        className={styles.input}
        required
      >
        <option value="">Selecione a instituição</option>
        {instituicaoUnidadeList.map((instituicao) => (
          <option key={instituicao.id} value={instituicao.id}>
            {instituicao.name}
          </option>
        ))}
      </select>

    {/* 
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
*/}

      <p>Equipamento</p>
      <select
        name="equipamento_id"
        value={form.equipamento_id}
        onChange={handleChange}
        className={styles.input}
        required
      >
        <option value="">Selecione o equipamento</option>
        {equipamentoList.map((equipamento) => (
          <option key={equipamento.id} value={equipamento.id}>
           {equipamento.patrimonio} - {equipamento.name}
          </option>
        ))}
      </select>

      <p>Status do Controle de Laboratório</p>
      <select
        name="statusControledeLaboratorio_id"
        value={form.statusControledeLaboratorio_id}
        onChange={handleChange}
        className={styles.input}
        required
      >
        <option value="">Selecione o status</option>
        {statusList.map((status) => (
          <option key={status.id} value={status.id}>
            {status.name}
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
