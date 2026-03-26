'use client';

import React from 'react'; 
import { useRouter } from 'next/navigation';
import styles from './cliente.module.scss';
import { FaRegTrashAlt } from "react-icons/fa";
import { useGlobalModal } from '@/provider/GlobalModalProvider'; 
import { ClientesMunicipaisProps, ClienteMunicipaisResponse } from '@/lib/getClientesMunicipais.type';
import { getCookieClient } from '@/lib/cookieClient';
import { api } from '@/services/api';

interface Props {
  clienteData: ClienteMunicipaisResponse;
}

export default function ClienteMunicipalList({ clienteData }: Props) {
  const {
    controles = [],
    total = 0,
  } = clienteData || {};

  // Usando o hook global para abrir o modal
  const { openModal } = useGlobalModal();
  const router = useRouter();

  // Função ajustada para disparar o tipo 'clienteMunicipal'
  async function handleDetailCompra(cliente: ClientesMunicipaisProps) {
    // Passamos o tipo que definimos no Provider e o objeto cliente em um array
    openModal('clienteMunicipal', [cliente]);
  }

  async function handleAddCliente() {
    router.push('/dashboard/formulariosadd/formularioClientesMunicipais');
  }

  async function handleDeleteCliente(clienteId: string) {
    if(!confirm("Tem certeza que deseja excluir este cliente?")) return;

    try {
      const token = getCookieClient();

      // Ajuste a rota de delete se necessário, pois aqui parece estar a de 'compras'
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

  return (
    <section>
      <div className={styles.headerClient}>
        <h1 className={styles.titleClient}>Clientes Municipais</h1>

        <div className={styles.actions}>
          <button className={styles.button} onClick={handleAddCliente}>
            Cadastrar Novo Cliente
          </button>
        </div>
      </div>

      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <p className={styles.cardTitle}>Total</p>
          <strong className={styles.cardNumber}>{total}</strong>
        </div>
      </div>

      <div className={styles.listContainer}>
        {controles.map((cliente) => (
          <div
            key={cliente.id}
            // Chamamos a função passando o objeto cliente inteiro
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
      </div>
    </section>
  );
}