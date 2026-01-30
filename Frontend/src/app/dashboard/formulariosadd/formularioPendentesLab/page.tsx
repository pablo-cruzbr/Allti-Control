"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './FormularioPendenteslab.module.scss';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';
export const dynamic = 'force-dynamic';
interface ItemProps {
  id: string;
  name: string;
  patrimonio?: string;
}

export default function FormularioPendentesLab() {
  const [equipamento, setEquipamento] = useState<ItemProps[]>([]);
  const [statusMaquinas, setStatusMaquinas] = useState<ItemProps[]>([]);
  const [instituicao, setInstituicao] = useState<ItemProps[]>([]);

  const router = useRouter();

  function handleBack() {
    router.push('/dashboard/controles/pendentesLaboratorio');
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await getCookieClient();

        const [equipamentoRes, statusRes, instituicaoRes] = await Promise.all([
          api.get("/listequipamento", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/liststatusmaquinaspendenteslab", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/listinstuicao", { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setEquipamento(equipamentoRes.data);
        setStatusMaquinas(statusRes.data);
        setInstituicao(Array.isArray(instituicaoRes.data.instituicoes) ? instituicaoRes.data.instituicoes : []);

      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
    }

    fetchData();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      numeroDeSerie: formData.get("numeroDeSerie"),
      ssd: formData.get("ssd"),
      idDaOs: formData.get("idDaOs"),
      obs: formData.get("obs"),
      statusMaquinasPendentesLab_id: formData.get("statusMaquinasPendentesLab_id"),
      instituicaoUnidade_id: formData.get("instituicaoUnidade_id"),
      equipamento_id: formData.get("equipamento_id"),
    };

    console.log("Form Data enviado:", data);

    try {
      const token = await getCookieClient();

      await api.post("/controledemaquinaspendenteslab", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      router.push("/dashboard/controles/pendentesLaboratorio");
    } catch (err) {
      console.error("Erro ao enviar formulário: ", err);
    }
  }

  return (
    <section>
      <div className={styles.headerClient}>
        <h1 className={styles.titleClient}>CADASTRO DE MÁQUINAS PENDENTES NO LABORATÓRIO</h1>
        <IoArrowBackCircleOutline size={30} color="#4B4B4B" onClick={handleBack} />
        <button className={styles.button} onClick={handleBack}>
          Voltar para Lista de Pendentes
        </button>
      </div>

      <div className={styles.container}>
        <section className={styles.login}>
          <form onSubmit={handleSubmit}>

            <input
              type="text"
              required
              name="numeroDeSerie"
              placeholder="Digite o Número de Série"
              className={styles.input}
            />

            <input
              type="text"
              required
              name="ssd"
              placeholder="Possui SSD? (Sim/Não)"
              className={styles.input}
            />

            <input
              type="text"
              required
              name="idDaOs"
              placeholder="Digite o ID da OS"
              className={styles.input}
            />

            <input
              type="text"
              required
              name="obs"
              placeholder="Observações"
              className={styles.input}
            />

            {/* Select Status */}
            <select name="statusMaquinasPendentesLab_id" className={styles.input} required>
              <option value="">Selecione o Status</option>
              {statusMaquinas.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            {/* Select Instituição */}
            <select name="instituicaoUnidade_id" className={styles.input} required>
              <option value="">Selecione a Instituição/Unidade</option>
              {instituicao.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            {/* Select Equipamento */}
            <select name="equipamento_id" className={styles.input} required>
              <option value="">Selecione o Equipamento</option>
              {equipamento.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.patrimonio} - {item.name}
                </option>
              ))}
            </select>

            <button className={styles.button} type="submit">
              Cadastrar
            </button>
          </form>
        </section>
      </div>
    </section>
  );
}
