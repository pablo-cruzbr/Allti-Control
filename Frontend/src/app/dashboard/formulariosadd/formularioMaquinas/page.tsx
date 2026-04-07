"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './FormularioMaquinas.module.scss';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';
import Select from 'react-select';

export const dynamic = 'force-dynamic';

interface ItemProps {
  id: string;
  name: string;
}

export default function FormularioCompras() {
  const [instituicoes, setInstituicoes] = useState<ItemProps[]>([]);
  const [selectedInstituicao, setSelectedInstituicao] = useState<{ value: string; label: string } | null>(null);
  const router = useRouter();
  const options = instituicoes.map(inst => ({
    value: inst.id,
    label: inst.name
  }));

  useEffect(() => {
    async function loadInstituicoes() {
      try {
        const token = await getCookieClient();
        const response = await api.get("/listinstuicao", {
          headers: { Authorization: `Bearer ${token}` }
        });
    
        const data = Array.isArray(response.data) ? response.data : response.data.instituicoes;
        setInstituicoes(data || []);
      } catch (err) {
        console.error("Erro ao carregar instituições:", err);
      }
    }

    loadInstituicoes();
  }, []);

  function handleBackCardCompras() {
    router.push('/dashboard/controles/equipamentos');
  }

  async function handleFormularioCompras(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const patrimonio = formData.get("patrimonio");
    
    const instituicaoUnidade_id = selectedInstituicao?.value;

    if(!instituicaoUnidade_id){
      alert("Por favor, selecione uma instituição.");
      return;
    }

    try {
      const token = await getCookieClient();

      await api.post("/equipamento", {
        name,
        patrimonio,
        instituicaoUnidade_id, 
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      router.push("/dashboard/controles/equipamentos");
    } catch (err: any) {
      console.error("Erro ao cadastrar equipamento:", err.response?.data || err.message);
    }
  }

  return (
    <section>
      <div className={styles.headerClient}>
        <h1 className={styles.titleClient}> CADASTRO DE EQUIPAMENTOS</h1>
        <IoArrowBackCircleOutline size={30} color="#4B4B4B" onClick={handleBackCardCompras} style={{cursor: 'pointer'}}/>
        <button className={styles.button} onClick={handleBackCardCompras}>
          Voltar para Lista de Equipamentos
        </button>
      </div>

      <div className={styles.container}>
        <section className={styles.login}>
          <form onSubmit={handleFormularioCompras}>
            <input
              type="text"
              required
              name="name"
              placeholder="Digite nome do Equipamento"
              className={styles.input}
            />

            <input
              type="number"
              required
              name="patrimonio"
              placeholder="Digite o Patrimonio"
              className={styles.input}
            />

            <div style={{ marginBottom: '1rem' }}>
              <Select
                instanceId="cadastro-equipamento-select"
                options={options}
                placeholder="Selecione uma instituição"
                noOptionsMessage={() => "Nenhuma instituição encontrada"}
                value={selectedInstituicao}
                onChange={(option) => setSelectedInstituicao(option)}
                isSearchable={true}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    borderColor: state.isFocused ? '#4E3182' : '#ddd',
                    boxShadow: 'none',
                    minHeight: '45px',
                    fontFamily: 'Poppins, sans-serif',
                    '&:hover': { borderColor: '#4E3182' }
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 9999,
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected 
                      ? '#4E3182' 
                      : state.isFocused 
                      ? '#f3effa' 
                      : '#fff',
                    color: state.isSelected ? '#fff' : '#4B4B4B',
                    cursor: 'pointer',
                    fontFamily: 'Poppins, sans-serif',
                    '&:active': { backgroundColor: '#4E3182' }
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: '#4B4B4B',
                    fontFamily: 'Poppins, sans-serif',
                  }),
                  input: (base) => ({
                    ...base,
                    color: '#4B4B4B',
                  }),
                }}
              />
            </div>

            <button className={styles.button} type="submit">
              Cadastrar
            </button>
          </form>
        </section>
      </div>
    </section>
  );
}