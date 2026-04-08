'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './FormularioControledeEstabilizadores.module.scss';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';
export const dynamic = 'force-dynamic';
interface ItemProps {
  id: string;
  name: string;
  patrimonio?: string;
}

export default function FormularioControledeEstabilizadores() {
  const router = useRouter();
  const [form, setForm] = useState({
    idChamado: "",
    problema: "",
    observacoes: "",
    osdaAssistencia: "",
    datadeChegada: "",
    datadeRetirada: "",
    estabilizadores_id: "",
    statusEstabilizadores_id: "",
    instituicaoUnidade_id: ""
  });

  const [equipamentos, setEquipamentos] = useState<ItemProps[]>([]);
  const [statusEstabilizadores, setStatusEstabilizadores] = useState<ItemProps[]>([]);
  const [instituicoes, setInstituicoes] = useState<ItemProps[]>([]);
  const [listsLoaded, setListsLoaded] = useState(false);

  const handleBack = () => router.push('/dashboard/controles/estabilizadores');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getCookieClient();
        const [equipRes, statusRes, instRes] = await Promise.all([
          api.get("/list/estabilizadores", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/liststatus/estabilizadores", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/listinstuicao", { headers: { Authorization: `Bearer ${token}` } })
        ]);

        setEquipamentos(Array.isArray(equipRes.data) ? equipRes.data : []);
        setStatusEstabilizadores(Array.isArray(statusRes.data) ? statusRes.data : []);
        setInstituicoes(Array.isArray(instRes.data.instituicoes) ? instRes.data.instituicoes : []);

        setListsLoaded(true);
      } catch (err) {
        console.error("Erro ao buscar listas:", err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    // Validação simples
    const requiredFields = [
      "idChamado",
      "problema",
      "osdaAssistencia",
      "datadeChegada",
      "datadeRetirada",
      "estabilizadores_id",
      "statusEstabilizadores_id",
      "instituicaoUnidade_id"
    ];

    for (const field of requiredFields) {
      if (!form[field as keyof typeof form]) {
        alert("Preencha todos os campos obrigatórios.");
        return;
      }
    }

    try {
      const token = await getCookieClient();
      await api.post("/controledeestabilizadores", {
        ...form,
        datadeChegada: new Date(form.datadeChegada).toISOString(),
        datadeRetirada: new Date(form.datadeRetirada).toISOString()
      }, { headers: { Authorization: `Bearer ${token}` } });

      alert("Solicitação enviada com sucesso!");
      router.push("/dashboard/controles/estabilizares");
    } catch (err: any) {
      console.error("Erro ao enviar formulário:", err.response?.data ?? err.message ?? err);
      alert(err.response?.status === 400 
        ? "Erro 400 - Verifique os campos obrigatórios." 
        : "Erro inesperado ao enviar formulário.");
    }
  };

  if (!listsLoaded) return <p>Carregando listas...</p>;

  return (
    <section>
      <div className={styles.headerClient}>
        <h1 className={styles.titleClient}>FORMULÁRIO CONTROLE DE ESTABILIZADORES</h1>
        <IoArrowBackCircleOutline size={30} color="#4B4B4B" onClick={handleBack} />
        <button className={styles.button} onClick={handleBack}>Voltar</button>
      </div>

      <div className={styles.container}>
        <section className={styles.login}>
          <form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
            <input type="text" name="idChamado" value={form.idChamado} onChange={handleChange} placeholder="ID do Chamado" className={styles.input} />
            <input type="text" name="problema" value={form.problema} onChange={handleChange} placeholder="Problema" className={styles.input} />
            <textarea name="observacoes" value={form.observacoes} onChange={handleChange} placeholder="Observações (Opcional)" className={styles.input} />
            <input type="text" name="osdaAssistencia" value={form.osdaAssistencia} onChange={handleChange} placeholder="OS da Assistência" className={styles.input} />

            <p>Data de Chegada</p>
            <input type="date" name="datadeChegada" value={form.datadeChegada} onChange={handleChange} className={styles.input} />

            <p>Data de Retirada</p>
            <input type="date" name="datadeRetirada" value={form.datadeRetirada} onChange={handleChange} className={styles.input} />

            <select name="estabilizadores_id" value={form.estabilizadores_id} onChange={handleChange} className={styles.input}>
              <option value="">Selecione o Estabilizador</option>
              {equipamentos.map(e => <option key={e.id} value={e.id}>{e.patrimonio} - {e.name}</option>)}
            </select>

            <select name="statusEstabilizadores_id" value={form.statusEstabilizadores_id} onChange={handleChange} className={styles.input}>
              <option value="">Selecione o Status</option>
              {statusEstabilizadores.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>

            <select name="instituicaoUnidade_id" value={form.instituicaoUnidade_id} onChange={handleChange} className={styles.input}>
              <option value="">Selecione a Instituição</option>
              {instituicoes.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
            </select>

            <button className={styles.button} type="submit">Enviar Solicitação</button>
          </form>
        </section>
      </div>
    </section>
  );
}
