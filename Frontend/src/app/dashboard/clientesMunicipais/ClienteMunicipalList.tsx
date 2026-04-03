'use client';

import React, { useEffect, useState } from 'react'; 
import { useRouter } from 'next/navigation';
import styles from './cliente.module.scss';
import { FaRegTrashAlt } from "react-icons/fa";
import { useGlobalModal } from '@/provider/GlobalModalProvider'; 
import { ClientesMunicipaisProps, ClienteMunicipaisResponse } from '@/lib/getClientesMunicipais.type';
import { getCookieClient } from '@/lib/cookieClient';
import { LuRefreshCcw } from "react-icons/lu";
import { toast } from 'sonner';

import { api } from '@/services/api';

interface Props {
  clienteData: ClienteMunicipaisResponse;
}

interface TipoUnidade {
  id: string;
  name: string;
}

export default function ClienteMunicipalList({ clienteData }: Props) {
  const {
    controles = [],
    total = 0,
  } = clienteData || {};

  const { openModal } = useGlobalModal();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [tipos, setTipos] = useState<TipoUnidade[]>([]);
  const [selectedTipo, setSelectedTipo] = useState<string>("");
  const [filterType, setFilterType] = useState<'all' | 'cliente' | 'instituicao'>('all');
  
  useEffect(() => {
    async function loadTipos() {
      try {
        const token = await getCookieClient();
        const response = await api.get('/listtipodeinstituicaounidade', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTipos(response.data);
      } catch (err) {
        console.error("Erro ao buscar tipos:", err);
      }
    }
    loadTipos();
  }, []);

  const filteredClienteMunicipais = controles.filter((cliente) => {
  const searchLower = searchTerm.toLowerCase();

  const matchesSearch =
    cliente.name.toLowerCase().includes(searchLower) ||
    cliente.endereco.toLowerCase().includes(searchLower) ||
    cliente.telefone.toLowerCase().includes(searchLower) ||
    cliente.tipodeinstituicaoUnidade?.name?.toLowerCase().includes(searchLower);

  const matchesFilter =
    selectedTipo === 'all' || 
    cliente.tipodeinstituicaoUnidade?.name === selectedTipo;

  return matchesSearch && matchesFilter;
});


  const handleRefresh = () => {
    router.refresh();
    setSelectedTipo(""); 
    toast.success("Lista atualizada com sucesso!");
  };

  async function handleDetailCompra(cliente: ClientesMunicipaisProps) {
    openModal('clienteMunicipal', [cliente]);
  }

  async function handleAddCliente() {
    router.push('/dashboard/formulariosadd/formularioClientesMunicipais');
  }

  async function handleDeleteCliente(clienteId: string) {
    if(!confirm("Tem certeza que deseja excluir este cliente?")) return;

    try {
      const token = getCookieClient();
      await api.delete(`/deletedesolicitacaodecompras/${clienteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          compra_id: clienteId,
        },
      });

      router.refresh();
    } catch (error) {
      console.error('Erro ao deletar o cliente:', error);
    }
  }

  const filteredClientes = controles.filter(cliente => {
    const matchTipo = selectedTipo 
      ? cliente.tipodeinstituicaoUnidade?.id === selectedTipo 
      : true;
    
    return matchTipo;
  });

  return (
    <section>
      <div className={styles.headerClient}>
        <h1 className={styles.titleClient}>Clientes Municipais</h1>

       <div className={styles.actions}>
          <div className={styles.searchContainer}>

          <input
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />

        <select 
          value={selectedTipo} 
          onChange={(e) => setSelectedTipo(e.target.value)}
          className={styles.select} // O CSS vai buscar .actions .select
        >
          <option value="">Todos os Tipos</option>
          {tipos.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>
              {tipo.name}
            </option>
          ))}
        </select>
        </div>

          <button className={styles.button} onClick={handleAddCliente}>
            Cadastrar Novo Cliente
          </button>
           <LuRefreshCcw onClick={handleRefresh} className={styles.refresh} />
        </div>
      </div>

      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <p className={styles.cardTitle}>Total</p>
          <strong className={styles.cardNumber}>
            {selectedTipo ? filteredClientes.length : total}
          </strong>
        </div>
      </div>

      <div className={styles.listContainer}>
        {filteredClientes.map((cliente) => (
          <div
            key={cliente.id}
            onClick={() => handleDetailCompra(cliente)}
            className={styles.list}
          >
            <div className={styles.clientDetail}>
              <p className={`${styles.field} ${styles.name}`}>
                <strong>Nome do Cliente: </strong>{cliente.name}
              </p>

              <p className={`${styles.field} ${styles.name}`}>
                <strong>Tipo: </strong>
                {cliente.tipodeinstituicaoUnidade?.name || "Não informado"}
              </p>

              <p className={`${styles.field} ${styles.name}`}>
                <strong>Endereço: </strong>{cliente.endereco}
              </p>

              <p className={`${styles.field} ${styles.data}`}>
                <strong>Data:</strong>{" "}
                {cliente.created_at
                  ? new Date(cliente.created_at).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Não informado"}
              </p>

              <FaRegTrashAlt
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteCliente(cliente.id);
                }}
                className={styles.iconTrash}
              />
            </div>
          </div>
        ))}

        {filteredClientes.length === 0 && (
          <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
            Nenhum cliente encontrado para este tipo.
          </p>
        )}
      </div>
    </section>
  );
}