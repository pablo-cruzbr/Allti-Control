"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import styles from "../modalCardCompras/editForm.module.scss";
import { LaudoTecnicoProps } from "@/lib/getLaudoTecnico.type";
import { getCookieClient } from "@/lib/cookieClient";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaRegSave } from "react-icons/fa";

type Equipamento = { id: string; name: string, patrimonio: string };
type Tecnicos = { id: string; name: string };
type Instituicao = { id: string; name: string; endereco: string };

type FormState = {
  descricaodoProblema: string;
  mesAno: string;
  osLab: string;
  equipamento_id: string;
  tecnico_id: string;
  instituicaoUnidade_id: string;
};

type Props = {
  laudoTecnico: LaudoTecnicoProps;
  onClose: () => void;
};

export default function EditLaudoTecnicoForm({ laudoTecnico, onClose }: Props) {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    descricaodoProblema: laudoTecnico?.descricaodoProblema || "",
    mesAno: laudoTecnico?.mesAno || "",
    osLab: laudoTecnico?.osLab || "",
    equipamento_id: laudoTecnico?.equipamento?.id || "",
    tecnico_id: laudoTecnico?.tecnico?.id || "",
    instituicaoUnidade_id: laudoTecnico?.instituicaoUnidade?.id || "",
  });

  const [equipamentoList, setEquipamentoList] = useState<Equipamento[]>([]);
  const [tecnicosList, setTecnicosList] = useState<Tecnicos[]>([]);
  const [instituicaoUnidadeList, setInstituicaoUnidadeList] = useState<Instituicao[]>([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const token = await getCookieClient();
        const [equipamentos, tecnicos, instituicoes] = await Promise.all([
          api.get("/listequipamento", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/listtecnico", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/listinstuicao", { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setEquipamentoList(equipamentos.data);
        setTecnicosList(tecnicos.data.controles);
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
      await api.patch(`/laudotecnico/update/${laudoTecnico.id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Laudo técnico atualizado com sucesso!");
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
        Editar Laudo Técnico
      </h3>

      <label>
        <p>Descrição do Problema</p>
        <textarea
          name="descricaodoProblema"
          value={form.descricaodoProblema}
          onChange={handleChange}
          placeholder="Descreva o problema"
          required
        />
      </label>

      <label>
        <p>Mês/Ano</p>
        <input
          type="date"
          name="mesAno"
          value={form.mesAno}
          onChange={handleChange}
          placeholder="Mês/Ano (ex: 06/2025)"
          required
        />
      </label>

      <label>
        <p>OS do Laboratório</p>
        <input
          type="text"
          name="osLab"
          value={form.osLab}
          onChange={handleChange}
          placeholder="Número da OS do laboratório"
          required
        />
      </label>

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

      <label>
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
      </label>

      <label>
        <p>Instituição/Unidade</p>
        <select
          name="instituicaoUnidade_id"
          value={form.instituicaoUnidade_id}
          onChange={handleChange}
          required
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
