'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './FormularioAssistenciaTecnica.module.scss';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';
export const dynamic = 'force-dynamic';
interface ItemProps {
  id: string;
  name: string;
  patrimonio?: string;
}

export default function FormularioAssistenciaTecnica() {
  const [equipamentos, setEquipamentos] = useState<ItemProps[]>([]);
  const [statusReparos, setStatusReparos] = useState<ItemProps[]>([]);
  const [instituicoes, setInstituicoes] = useState<ItemProps[]>([]);
  const [tecnicos, setTecnicos] = useState<ItemProps[]>([]);
  const [clientes, setClientes] = useState<ItemProps[]>([]);

  const router = useRouter();

  function handleBack() {
    router.push('/dashboard/controles/assistenciaTecnica');
  }

 useEffect(() => {
  async function fetchData() {
    try {
      const token = await getCookieClient();

      const [
        equipamentoRes,
        statusRes,
        instituicaoRes,
        tecnicoRes,
        clienteRes
      ] = await Promise.all([
        api.get("/listequipamento", { headers: { Authorization: `Bearer ${token}` } }),
        api.get("/liststatusreparo", { headers: { Authorization: `Bearer ${token}` } }),
        api.get("/listinstuicao", { headers: { Authorization: `Bearer ${token}` } }),
        api.get("/listtecnico", { headers: { Authorization: `Bearer ${token}` } }),
        api.get("/listcliente", { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      setEquipamentos(Array.isArray(equipamentoRes.data) ? equipamentoRes.data : []);
      setStatusReparos(Array.isArray(statusRes.data) ? statusRes.data : []);
      setInstituicoes(Array.isArray(instituicaoRes.data.instituicoes) ? instituicaoRes.data.instituicoes : []);
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

    const name = formData.get("name") as string;
    const mesAno = formData.get("mesAno") as string;
    const idChamado = formData.get("idChamado") as string;
    const assistencia = formData.get("assistencia") as string;
    const observacoes = formData.get("observacoes") as string;
    const osDaAssistencia = formData.get("osDaAssistencia") as string;
    const dataDeRetirada = formData.get("dataDeRetirada") as string;

    const equipamento_id = formData.get("equipamento_id") as string;
    const statusReparo_id = formData.get("statusReparo_id") as string;
    const instituicaoUnidade_id = formData.get("instituicaoUnidade_id") as string;
    const tecnico_id = formData.get("tecnico_id") as string;
    const cliente_id = formData.get("cliente_id") as string;

    if (
      !name || !mesAno || !idChamado || !assistencia || !osDaAssistencia ||
      !dataDeRetirada || !equipamento_id || !statusReparo_id || !tecnico_id
    ) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const token = await getCookieClient();

      await api.post("/controledeassistenciatecnica",
        {
          name,
          mesAno: new Date(mesAno).toISOString(),
          idChamado,
          assistencia,
          observacoes,
          osDaAssistencia,
          dataDeRetirada: new Date(dataDeRetirada).toISOString(),
          equipamento_id,
          statusReparo_id,
          instituicaoUnidade_id,
          tecnico_id,
          cliente_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      router.push("/dashboard/controles/assistenciaTecnica");
    } catch (err: any) {
      console.error("Erro ao enviar formulário:", err);
      if (err.response?.status === 400) {
        alert("Erro 400 - Verifique se todos os campos obrigatórios estão preenchidos corretamente.");
      } else {
        alert("Erro inesperado ao enviar formulário.");
      }
    }
  }

  return (
    <section>
      <div className={styles.headerClient}>
        <h1 className={styles.titleClient}>FORMULÁRIO ASSISTÊNCIA TÉCNICA</h1>
        <IoArrowBackCircleOutline size={30} color="#4B4B4B" onClick={handleBack} />
        <button className={styles.button} onClick={handleBack}>
          Voltar
        </button>
      </div>

      <div className={styles.container}>
        <section className={styles.login}>
          <form onSubmit={handleSubmit}>
            <input type="text" required name="name" placeholder="Nome do Registro" className={styles.input} />
            <p>Mês e Ano:</p>
            <input type="date" required name="mesAno" className={styles.input} />
            <input type="text" required name="idChamado" placeholder="ID do Chamado" className={styles.input} />
            <input type="text" required name="assistencia" placeholder="Assistência" className={styles.input} />
            <input type="text" name="observacoes" placeholder="Observações (Opcional)" className={styles.input} />
            <input type="text" required name="osDaAssistencia" placeholder="OS da Assistência" className={styles.input} />
            <p>Data de Retirada:</p>
            <input type="date" required name="dataDeRetirada" className={styles.input} />

            <select name="equipamento_id" className={styles.input} required>
              <option value="" disabled hidden>Selecione o Equipamento</option>
              {equipamentos.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.patrimonio} - {item.name}
                </option>
              ))}
            </select>

            <select name="statusReparo_id" className={styles.input} required>
              <option value="" disabled hidden>Selecione o Status do Reparo</option>
              {statusReparos.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <select name="instituicaoUnidade_id" className={styles.input} required>
              <option value="" disabled hidden>Selecione a Instituição/Unidade</option>
              {Array.isArray(instituicoes) && instituicoes.length > 0 ? (
                instituicoes.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))
              ) : (
                <option disabled>Nenhuma instituição disponível</option>
              )}
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
              {clientes.length === 0 ? (
                <option>Carregando...</option>
              ) : (
                <>
                  <option value="" disabled hidden>Selecione o Cliente</option>
                  {clientes.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </>
              )}
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
