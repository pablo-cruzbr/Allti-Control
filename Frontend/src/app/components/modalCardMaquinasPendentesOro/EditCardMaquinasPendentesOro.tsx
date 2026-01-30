"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import styles from "../modalCardCompras/editForm.module.scss";
import { MaquinasPendentesOroProps } from "@/lib/getMaquinasPendentesOro.type";
import { getCookieClient } from "@/lib/cookieClient";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaRegSave } from "react-icons/fa";
import axios from "axios";

type Equipamento = { id: string; name: string };
type Instituicao = { id: string; name: string; endereco: string };
type Status = { id: string; name: string };

type FormState = {
  datadaInstalacao: string;
  osInstalacao: string;
  osRetirada: string;
  equipamento_id: string;
  statusMaquinasPendentesOro_id: string;
  instituicaoUnidade_id: string;
};

type Props = {
  maquinasPendentesOro: MaquinasPendentesOroProps;
  onClose: () => void;
};

export default function EditMaquinasPendentesOroForm({
  maquinasPendentesOro,
  onClose,
}: Props) {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    datadaInstalacao: maquinasPendentesOro?.datadaInstalacao
      ? maquinasPendentesOro.datadaInstalacao.slice(0, 10)
      : "",
    osInstalacao: maquinasPendentesOro?.osInstalacao || "",
    osRetirada: maquinasPendentesOro?.osRetirada || "",
    equipamento_id: maquinasPendentesOro?.equipamento?.id || "",
    statusMaquinasPendentesOro_id:
      maquinasPendentesOro?.statusMaquinasPendentesOro?.id || "",
    instituicaoUnidade_id: maquinasPendentesOro?.instituicaoUnidade?.id || "",
  });

  const [equipamentoList, setEquipamentoList] = useState<Equipamento[]>([]);
  const [instituicaoUnidadeList, setInstituicaoUnidadeList] = useState<Instituicao[]>([]);
  const [statusList, setStatusList] = useState<Status[]>([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const token = await getCookieClient();
        const [equipamentos, status, instituicoes] = await Promise.all([
          api.get("/listequipamento", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get("/liststatusMaquinasPendentesOro", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get("/listinstuicao", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setEquipamentoList(equipamentos.data);
        setStatusList(status.data);
        setInstituicaoUnidadeList(Array.isArray(instituicoes.data.instituicoes) ? instituicoes.data.instituicoes : []);
      } catch (error) {
        console.error("Erro ao buscar listas:", error);
      }
    };
    fetchLists();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const token = await getCookieClient();

      // **MODELO DO ASSISTENCIATECNICA**
      const dataInstalacaoISO = form.datadaInstalacao
        ? new Date(`${form.datadaInstalacao}T12:00:00Z`).toISOString()
        : null;

      const dataToSend = {
        ...form,
        datadaInstalacao: dataInstalacaoISO,
      };

      await api.patch(
        `/controledemaquinaspendentesOro/update/${maquinasPendentesOro.id}`,
        dataToSend,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Máquina pendente atualizada com sucesso!");
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

  return (
    <div className={styles.editForm}>
      <h3>
        <HiOutlinePencilSquare className={styles.icon} />
        Editar Máquina Pendente Oro
      </h3>

      <label>
        <p>Data da Instalação</p>
        <input
          type="date"
          name="datadaInstalacao"
          value={form.datadaInstalacao}
          onChange={handleChange}
        />
        <span>
          {form.datadaInstalacao
            ? new Date(form.datadaInstalacao).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })
            : "-"}
        </span>
      </label>

      <label>
        <p>OS Instalação</p>
        <input
          type="text"
          name="osInstalacao"
          value={form.osInstalacao}
          onChange={handleChange}
        />
      </label>

      <label>
        <p>OS Retirada</p>
        <input
          type="text"
          name="osRetirada"
          value={form.osRetirada}
          onChange={handleChange}
        />
      </label>

      <label>
        <p>Equipamento</p>
        <select
          name="equipamento_id"
          value={form.equipamento_id}
          onChange={handleChange}
          className={styles.input}
        >
          <option value="">Selecione o equipamento</option>
          {equipamentoList.map((equip) => (
            <option key={equip.id} value={equip.id}>
              {equip.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        <p>Status</p>
        <select
          name="statusMaquinasPendentesOro_id"
          value={form.statusMaquinasPendentesOro_id}
          onChange={handleChange}
          className={styles.input}
        >
          <option value="">Selecione o status</option>
          {statusList.map((status) => (
            <option key={status.id} value={status.id}>
              {status.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        <p>Instituição/Unidade</p>
        <select
          name="instituicaoUnidade_id"
          value={form.instituicaoUnidade_id}
          onChange={handleChange}
          className={styles.input}
        >
          <option value="">Selecione a instituição</option>
          {instituicaoUnidadeList.map((inst) => (
            <option key={inst.id} value={inst.id}>
              {inst.name}
            </option>
          ))}
        </select>
      </label>

      <div className={styles.buttonArea}>
        <button onClick={handleSubmit} type="button">
          <FaRegSave className={styles.iconButton} />
          Salvar
        </button>
        <button onClick={onClose} type="button">
          Cancelar
        </button>
      </div>
    </div>
  );
}
