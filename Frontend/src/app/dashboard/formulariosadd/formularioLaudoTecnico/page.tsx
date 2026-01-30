'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './FormularioLaudoTecnico.module.scss';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';
export const dynamic = 'force-dynamic';
interface ItemProps {
  id: string;
  name: string;
  descricaodoProblema: string;
  patrimonio: string;
}

export default function FormularioAssistenciaTecnica() {
  const [equipamento, setEquipamento] = useState<ItemProps[]>([]);
  const [instituicao, setInstituicao] = useState<ItemProps[]>([]);
  const [tecnico, setTecnico] = useState<ItemProps[]>([])
  const router = useRouter();

  function handleBack() {
    router.push('/dashboard/controles/laudoTecnico');
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await getCookieClient();

        const [equipamentoRes, statusRes, instituicaoRes, tecnicoRes] = await Promise.all([
          api.get("/listequipamento", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/liststatusreparo", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/listinstuicao", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/listtecnico", { headers: { Authorization: `Bearer ${token}` } }),
        
        ]);

        setEquipamento(equipamentoRes.data || []);
        setInstituicao(instituicaoRes.data.instituicoes);
        setTecnico(tecnicoRes.data.controles);
    
        
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
      descricaodoProblema: formData.get("descricaodoProblema"),
      mesAno: new Date(formData.get("mesAno") as string).toISOString(),
      osLab: formData.get("osLab"),

      equipamento_id: formData.get("equipamento_id"),
      instituicaoUnidade_id: formData.get("instituicaoUnidade_id"),
      tecnico_id: formData.get("tecnico_id"),
    };

    console.log("Form Data:", data);

    try {
      const token = await getCookieClient();

      await api.post("/controledelaudotecnico", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      router.push("/dashboard/controles/laudoTecnico");
    } catch (err) {
      console.error("Erro ao enviar formulário:", err);
    }
  }

  return (
    <section>
      <div className={styles.headerClient}>
        <h1 className={styles.titleClient}>FORMULÁRIO LAUDO TÉCNICO</h1>
        <IoArrowBackCircleOutline size={30} color="#4B4B4B" onClick={handleBack} />
        <button className={styles.button} onClick={handleBack}>
          Voltar
        </button>
      </div>

      <div className={styles.container}>
        <section className={styles.login}>
          <form onSubmit={handleSubmit}>

            <input type="text" required name="descricaodoProblema" placeholder="Insira a Descrição do Problema" className={styles.input} />
            <p>Mês e Ano: </p>
            <input type="date" required name="mesAno" placeholder="Mês/Ano" className={styles.input} />
            <input type="text" required name="osLab" placeholder="Insira a OS de Laboratório" className={styles.input} />

           {/* Select Equipamento */}
            <select name="equipamento_id" className={styles.input} required>
              <option value="">Selecione o Equipamento</option>
              {equipamento.map((item) => (
                <option key={item.id} value={item.id}>
                {item.patrimonio} - {item.name}
                </option>
              ))}
            </select>

            {/* Select Instituição/Unidade */}
            <select name="instituicaoUnidade_id" className={styles.input} required>
              <option value="">Selecione a Instituição/Unidade</option>
              {instituicao.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>

            {/* Select Técnico */}
            <select name="tecnico_id" className={styles.input} required>
              <option value="">Selecione o Técnico</option>
              {tecnico.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
            <button className={styles.button} type="submit">
              Enviar Solicitação
            </button>

          </form>
        </section>
      </div>
    </section>
  );
}
