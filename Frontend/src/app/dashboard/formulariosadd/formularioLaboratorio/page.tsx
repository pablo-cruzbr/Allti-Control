'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './FormularioLaboratorio.module.scss';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';
export const dynamic = 'force-dynamic';
interface ItemProps {
  id: string;
  name: string;
  patrimonio?: string;
}

export default function FormularioLaboratorio() {
  const [equipamento, setEquipamento] = useState<ItemProps[]>([]);
  const [statusControle, setStatusControle] = useState<ItemProps[]>([]);
  const [instituicao, setInstituicao] = useState<ItemProps[]>([]);
  const [tecnicos, setTecnicos] = useState<ItemProps[]>([]);
  const [clientes, setClientes] = useState<ItemProps[]>([]);

  const router = useRouter();

  function handleBack() {
    router.push('/dashboard/controles/laboratorio');
  }

useEffect(() => {
  async function fetchData() {
    try {
      const token = await getCookieClient();

      const [equipamentoRes, statusRes, instituicaoRes, tecnicoRes, clienteRes] = await Promise.all([
        api.get("/listequipamento", { headers: { Authorization: `Bearer ${token}` } }),
        api.get("/listcontrolledeLaboratorio", { headers: { Authorization: `Bearer ${token}` } }),
        api.get("/listinstuicao", { headers: { Authorization: `Bearer ${token}` } }),
        api.get("/listtecnico", { headers: { Authorization: `Bearer ${token}` } }),
        api.get("/listcliente", { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      setEquipamento(Array.isArray(equipamentoRes.data) ? equipamentoRes.data : []);
      setStatusControle(Array.isArray(statusRes.data) ? statusRes.data : []);
      setInstituicao(Array.isArray(instituicaoRes.data.instituicoes) ? instituicaoRes.data.instituicoes : []);
      setTecnicos(Array.isArray(tecnicoRes.data.controles) ? tecnicoRes.data.controles : []);
      setClientes(Array.isArray(clienteRes.data.controles) ? clienteRes.data.controles : []);
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
      nomedoEquipamento: formData.get("nomedoEquipamento"),
      defeito: formData.get("defeito"),
      marca: formData.get("marca"),
      osDeAbertura: formData.get("osDeAbertura"),
      osDeDevolucao: formData.get("osDeDevolucao"),
      data_de_Chegada: new Date(formData.get("data_de_Chegada") as string).toISOString(),
      data_de_Finalizacao: new Date(formData.get("data_de_Finalizacao") as string).toISOString(),

      equipamento_id: formData.get("equipamento_id"),
      statusControledeLaboratorio_id: formData.get("statusControledeLaboratorio_id"),
      instituicaoUnidade_id: formData.get("instituicaoUnidade_id"),
      tecnico_id: formData.get("tecnico_id"),
      cliente_id: formData.get("cliente_id"),
    };

    console.log("Dados enviados:", data);

    try {
      const token = await getCookieClient();

      await api.post("/controledelaboratorio", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      router.push("/dashboard/controles/laboratorio");
    } catch (err) {
      console.error("Erro ao enviar formulário:", err);
      alert("Erro ao enviar formulário. Verifique os campos obrigatórios.");
    }
  }

  return (
    <section>
      <div className={styles.headerClient}>
        <h1 className={styles.titleClient}>FORMULÁRIO LABORATÓRIO</h1>
        <IoArrowBackCircleOutline size={30} color="#4B4B4B" onClick={handleBack} />
        <button className={styles.button} onClick={handleBack}>
          Voltar
        </button>
      </div>

      <div className={styles.container}>
        <section className={styles.login}>
          <form onSubmit={handleSubmit}>

            <input type="text" required name="nomedoEquipamento" placeholder="Nome do Equipamento" className={styles.input} />
            <input type="text" required name="defeito" placeholder="Defeito" className={styles.input} />
            <input type="text" required name="marca" placeholder="Marca" className={styles.input} />
            <input type="text" required name="osDeAbertura" placeholder="OS de Abertura" className={styles.input} />
            <input type="text" required name="osDeDevolucao" placeholder="OS de Devolução" className={styles.input} />

            <p>Data de Chegada</p>
            <input type="date" required name="data_de_Chegada" className={styles.input} />

            <p>Data de Finalização</p>
            <input type="date" required name="data_de_Finalizacao" className={styles.input} />

            <select name="equipamento_id" className={styles.input} required>
              <option value="">Selecione o Equipamento</option>
              {equipamento.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.patrimonio} - {item.name}
                </option>
              ))}
            </select>

            <select name="statusControledeLaboratorio_id" className={styles.input} required>
              <option value="">Selecione o Status</option>
              {statusControle.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <select name="instituicaoUnidade_id" className={styles.input} required>
              <option value="">Selecione a Instituição/Unidade</option>
              {instituicao.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <select name="tecnico_id" className={styles.input} required>
              <option value="" disabled hidden>Selecione o Técnico</option>
              {tecnicos.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <select name="cliente_id" className={styles.input} required>
              <option value="">Selecione o Cliente</option>
              {clientes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
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
