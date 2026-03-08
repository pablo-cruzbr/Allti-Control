'use client';

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './ticketsLit.module.scss';
import { FaRegTrashAlt } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuRefreshCcw } from "react-icons/lu";
import { OrdemdeServicoResponseData, OrdemdeServicoProps } from '@/lib/getOrdemdeServico.type';
import { getCookieClient } from '@/lib/cookieClient';
import { api } from '@/services/api';
import { useGlobalModal } from '@/provider/GlobalModalProvider';
import { ModalContext } from '@/provider/compras';
import { toast } from 'sonner';

interface Props {
  ticketsData: OrdemdeServicoResponseData;
}

interface Instituicao {
  id: string;
  name: string;
}

interface StatusPrioridade {
  id: string;
  name: string;
}


interface Cliente {
  id: string;
  name: string;
}

interface TipodeOrdemdeServico {
  id: string;
  name: string;
}

export default function TicketsList({ ticketsData }: Props) {
  const router = useRouter();
  const { openModal } = useGlobalModal();
  const { isOpen } = useContext(ModalContext);

  // Estados de filtro e busca
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [searchOS, setSearchOS] = useState<string>("");
  const [instituicoes, setInstituicoes] = useState<Instituicao[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [selectedInstituicao, setSelectedInstituicao] = useState<string>("");
  const [tiposOrdem, setTiposOrdem] = useState<TipodeOrdemdeServico[]>([]);
  const [selectedTipoOrdem, setSelectedTipoOrdem] = useState<string>("");
  const [selectedCliente, setSelectedCliente] = useState<string>("");

  // Dados das ordens
  const { total = 0, totalPausada = 0, totalAberta = 0, totalEmAndamento = 0, totalConcluida = 0, totalOrdemdeServico = 0, totalTicket = 0, controles = [] } = ticketsData || {};

  // Carregar Instituições e Clientes para os selects
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const token = await getCookieClient();
        const [instRes, cliRes, tipoRes] = await Promise.all([
          api.get("/listinstuicao", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/listcliente", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/listtipodeordemdeservico", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/liststatusprioridade", { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setInstituicoes(instRes.data.instituicoes ?? []);
        setClientes(cliRes.data.controles ?? []);
        setTiposOrdem(tipoRes.data ?? []);
      } catch (error) {
        console.error("Erro ao carregar filtros:", error);
      }
    };
    fetchFilters();
  }, []);

  const handleDetailOrdemdeServico = (ticket: OrdemdeServicoProps) => {
    openModal('OrdemdeServico', [ticket]);
  };

  const handleAddCardTecnico = () => {
    router.push('/AreadeUsuario/formularioAddTickets');
  };

  const handleRefresh = () => {
    router.refresh();
    toast.success("Tickets atualizados com sucesso!");
    setSelectedStatus(null);
    setSearchOS("");
    setSelectedInstituicao("");
    setSelectedCliente("");
    setSelectedTipoOrdem("");
  };

  const handleDeleteCardTecnico = async (tecnico_id: string) => {
    try {
      const token = await getCookieClient();
      await api.delete(`/removertecnico/${tecnico_id}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { tecnico_id },
      });
      router.refresh();
    } catch (error) {
      console.error("Erro ao deletar técnico:", error);
    }
  };

  const filteredControles = controles.filter(ticket => {
  const matchStatus = selectedStatus ? ticket.statusOrdemdeServico?.name === selectedStatus : true;
  const matchOS = searchOS ? ticket.numeroOS?.toString().includes(searchOS) : true;
  const matchInstituicao = selectedInstituicao ? ticket.instituicaoUnidade?.id === selectedInstituicao : true;
  const matchTipodeOrdemdeServico = selectedTipoOrdem ? ticket.tipodeOrdemdeServico?.id === selectedTipoOrdem : true;
  const matchCliente = selectedCliente 
    ? (ticket.cliente?.id === selectedCliente || ticket.user?.cliente?.id === selectedCliente)
    : true;

  return matchStatus && matchOS && matchInstituicao && matchCliente && matchTipodeOrdemdeServico;
});


  return (
    <section>
      <div className={styles.headerClient}>
        <h1 className={styles.titleClient}>Tickets Cadastrados</h1>
        <div className={styles.actions}>
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Pesquisar por número da OS..."
                value={searchOS}
                onChange={(e) => setSearchOS(e.target.value)}
                className={styles.searchInput}
              />
      </div>
          <LuRefreshCcw onClick={handleRefresh} className={styles.refresh} />
           <button className={styles.button} onClick={handleAddCardTecnico}>Novo Registro</button> 
        </div>
      </div>

      <div className={styles.headerClient}>
        <div className={styles.actions}>
        <select value={selectedInstituicao} onChange={(e) => setSelectedInstituicao(e.target.value)} className={styles.select}>
          <option value="">Todas Instituições</option>
          {instituicoes.map(inst => (
            <option key={inst.id} value={inst.id}>{inst.name}</option>
          ))}
        </select>

        <select value={selectedCliente} onChange={(e) => setSelectedCliente(e.target.value)} className={styles.select}>
          <option value="">Todos Clientes</option>
          {clientes.map(cli => (
            <option key={cli.id} value={cli.id}>{cli.name}</option>
          ))}
        </select>

         <select 
            value={selectedTipoOrdem} 
            onChange={(e) => setSelectedTipoOrdem(e.target.value)} 
            className={styles.select}
          >
            <option value="">Tipo de Ordem de Serviço</option>

            {tiposOrdem.map(tipo => (
              <option key={tipo.id} value={tipo.id}>{tipo.name}</option>
            ))}
        </select>
      </div> 
        </div>
      
      <div className={styles.cardsContainer}>
        {[
          { label: 'Total', value: total, status: null },
          { label: 'OS Aberta', value: totalAberta, status: 'ABERTA' },
          { label: 'OS em Andamento', value: totalEmAndamento, status: 'EM ANDAMENTO' },
          { label: 'OS Concluída', value: totalConcluida, status: 'CONCLUIDA' },
          { label: 'OS PAUSADA', value: totalPausada, status: 'PAUSADA' },

          { label: 'TICKET', value: totalTicket, status: 'TICKET' },
          { label: 'ORDEM DE SERVICO', value: totalOrdemdeServico, status: 'ORDEM DE SERVICO' },
        ].map((card) => (
          <div
            key={card.label}
            className={`${styles.card} ${selectedStatus === card.status ? styles.active : ''}`}
            onClick={() => setSelectedStatus(card.status)}
          >
            <p className={styles.cardTitle}>{card.label}</p>
            <strong className={styles.cardNumber}>{card.value}</strong>
          </div>
        ))}
      </div>

      <div className={styles.listContainer}>
        {filteredControles.map((ticket) => (
          <div
            key={ticket.id}
            onClick={() => handleDetailOrdemdeServico(ticket)}
            className={styles.list}
          >
            <div className={styles.clientDetail}>
              <p className={`${styles.field} ${styles.name}`}><strong>Nome: </strong>{ticket.name}</p>
              <p className={`${styles.field} ${styles.name}`}><strong>Status: </strong>{ticket.statusOrdemdeServico?.name}</p>
              {ticket.numeroOS && <p className={`${styles.field} ${styles.osNumber}`}><strong>Número da OS: </strong>{ticket.numeroOS}</p>}
              <p className={`${styles.field} ${styles.data}`}>
                Data: {ticket.created_at ? new Date(ticket.created_at).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }) : ""}
              </p>
              <IoDocumentTextOutline
                onClick={(e) => { e.stopPropagation();}}
                className={styles.iconTrash}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
