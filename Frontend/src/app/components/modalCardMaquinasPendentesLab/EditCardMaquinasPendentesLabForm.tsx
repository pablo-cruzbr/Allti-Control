"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import styles from "../modalCardCompras/editForm.module.scss";
import { MaquinasPendentesLabProps } from "@/lib/getMaquinasPendentesLab.type";
import { getCookieClient } from "@/lib/cookieClient";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaRegSave } from "react-icons/fa";

type Equipamento = { id: string; name: string; patrimonio: string };
type Instituicao = { id: string; name: string; endereco: string };
type Status = { id: string; name: string };

type FormState = {
  numeroDeSerie: string;
  ssd: string;
  idDaOs: string;
  obs: string;
  equipamento_id: string;
  statusMaquinasPendentesLab_id: string;
  instituicaoUnidade_id: string;
};

type Props = {
  maquinasPendentesLab: MaquinasPendentesLabProps;
  onClose: () => void;
};

export default function EditMaquinasPendentesLabForm({
  maquinasPendentesLab,
  onClose,
}: Props) {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    numeroDeSerie: maquinasPendentesLab?.numeroDeSerie || "",
    ssd: maquinasPendentesLab?.ssd || "",
    idDaOs: maquinasPendentesLab?.idDaOs || "",
    obs: maquinasPendentesLab?.obs || "",
    equipamento_id: maquinasPendentesLab?.equipamento?.id || "",
    statusMaquinasPendentesLab_id: maquinasPendentesLab?.statusMaquinasPendentesLab?.id || "",
    instituicaoUnidade_id: maquinasPendentesLab?.instituicaoUnidade?.id || "",
  });

  const [equipamentoList, setEquipamentoList] = useState<Equipamento[]>([]);
  const [instituicaoUnidadeList, setInstituicaoUnidadeList] = useState<Instituicao[]>([]);
  const [statusList, setStatusList] = useState<Status[]>([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const token = await getCookieClient();
        const [equipamentos, status, instituicoes] = await Promise.all([
          api.get("/listequipamento", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/liststatusMaquinasPendentesLab", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/listinstuicao", { headers: { Authorization: `Bearer ${token}` } }),
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const token = await getCookieClient();
      await api.patch(`/controledemaquinaspendenteslab/update/${maquinasPendentesLab.id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Máquina pendente atualizada com sucesso!");
      onClose();
      router.refresh();
    } catch (error: any) {
      console.error("Erro ao atualizar:", error?.response?.data ?? error?.message ?? String(error));
      alert("Erro ao atualizar os dados.");
    }
  };

  return (
    <div className={styles.editForm}>
      <h3>
        <HiOutlinePencilSquare className={styles.icon} />
        Editar Máquina Pendente Lab
      </h3>

      <label>
        <p>Número de Série</p>
        <input
          type="text"
          name="numeroDeSerie"
          value={form.numeroDeSerie}
          onChange={handleChange}
          placeholder="Número de série"
        />
      </label>

      <label>
        <p>SSD</p>
        <input
          type="text"
          name="ssd"
          value={form.ssd}
          onChange={handleChange}
          placeholder="SSD"
        />
      </label>

      <label>
        <p>ID da OS</p>
        <input
          type="text"
          name="idDaOs"
          value={form.idDaOs}
          onChange={handleChange}
          placeholder="ID da OS"
        />
      </label>

      <label>
        <p>Observações</p>
        <textarea
          name="obs"
          value={form.obs}
          onChange={handleChange}
          placeholder="Observações"
        />
      </label>

      <label>
        <p>Equipamento</p>
        <select
          name="equipamento_id"
          value={form.equipamento_id}
          onChange={handleChange}
          className={styles.input}
          required
        >
          <option value="">Selecione o equipamento</option>
          {equipamentoList.map((equip) => (
            <option key={equip.id} value={equip.id}>
             {equip.patrimonio} - {equip.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        <p>Status</p>
        <select
          name="statusMaquinasPendentesLab_id"
          value={form.statusMaquinasPendentesLab_id}
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
      </label>

      <label>
        <p>Instituição/Unidade</p>
        <select
          name="instituicaoUnidade_id"
          value={form.instituicaoUnidade_id}
          onChange={handleChange}
          className={styles.input}
          required
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
