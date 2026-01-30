'use client';

import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from './cliente.module.scss';
import { FaRegTrashAlt } from "react-icons/fa";
import { ModalContext } from '@/provider/compras';
import { ClientesProps, ClienteResponse } from '@/lib/getCliente.type';
import { getCookieClient } from '@/lib/cookieClient';
import { api } from '@/services/api';

interface Props {
  clienteData: ClienteResponse;
}

export default function ClientesList({ clienteData }: Props) {
  
  const { 
    controles = [], 
    total = 0, 
  } = clienteData || {};
  
  const { onRequestOpen } = useContext(ModalContext);
  const router = useRouter();

  async function handleDetailCompra(cliente_id: string, cliente: ClientesProps) {
    await onRequestOpen(cliente_id);
  }

  async function handleAddCliente() {
    router.push('/dashboard/formulariosadd/formularioClientesPrivados');
  }

  async function handleDeleteCliente(clienteId: string) {
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

      console.log('Removido com sucesso:', clienteId);
      router.refresh();
    } catch (error) {
      console.error('Erro ao deletar o cliente:', error);
    }
  }

  return (
    <section>
      <div className={styles.headerClient}>
        <h1 className={styles.titleClient}>Clientes Privados</h1>

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
            onClick={() => handleDetailCompra(cliente.id, cliente)}
            className={styles.list}
          >
            <div className={styles.clientDetail}>
              <p className={`${styles.field} ${styles.name}`}>
                <strong>Nome do Cliente: </strong>{cliente.name}
              </p>

              <p className={`${styles.field} ${styles.name}`}>
                <strong>CNPJ: </strong>{cliente.cnpj || "NÃO CADASTRADO"} 
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
