'use client';

import { useEffect } from 'react';
import styles from './styles.module.scss';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useGlobalModal } from '@/provider/GlobalModalProvider';
import { ClientesProps } from '@/lib/getCliente.type';
import { useState } from 'react';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import EditClienteForm from "./EditClienteForm"
import { useRouter } from 'next/navigation';

interface ModalClienteProps {
  data: ClientesProps[];
}

export function ModalCliente({ data }: ModalClienteProps) {
  const { closeModal, modalData, modalType, isOpen } = useGlobalModal();
  const cliente:ClientesProps | undefined = modalData?.[0] || modalData;
  const [IsEditing, setIsEditing] = useState(false)
  const router = useRouter();
  
    function handleRefresh(){
    router.refresh();
    closeModal();
  }

  useEffect(() => {
    if (modalType === 'cliente' && !cliente) {
      closeModal();
    }
  }, [cliente, modalType, closeModal]);

  if (modalType !== 'cliente' || !isOpen || !cliente) return null;

  return (
   <dialog className={styles.dialogContainer} open={true}>
      <section className={styles.dialogContent}>
        <article className={styles.container}>
          <button onClick={closeModal} className={styles.dialogBack}>
            <IoIosCloseCircleOutline size={40} color="#4E3182" />
          </button>
          <h2>DETALHES CLIENTE</h2>

          {IsEditing ? (
                      <EditClienteForm
                        cliente={cliente}
                        onClose={() => setIsEditing(false)}
                      />
                    ):(
          <>
          <span className={styles.itemSolicitado}>
            <p className={styles.item}>
              <b>Cliente:</b>
              <span>{cliente.name ?? '-'}</span>
            </p>
            <p className={styles.item}>
              <b>Endereço:</b>
              <span>{cliente.endereco ?? '-'}</span>
            </p>

            <p className={styles.item}>
              <b>CNPJ:</b>
              <span>{cliente.cnpj ?? '-'}</span>
            </p>

            <p className={styles.item}>
              <b>Data de Criação:</b>
              <span>
                {cliente.created_at
                  ? new Date(cliente.created_at).toLocaleDateString('pt-BR')
                  : '-'}
              </span>
            </p>
          </span>

          <div className={styles.areaButton}>
            <button
            className={styles.buttonBuy}
            onClick={() => setIsEditing(true)}
            >
              <HiOutlinePencilSquare className={styles.icon}/>
              Editar
            </button>
            <button className={styles.buttonBuy} onClick={handleRefresh}>Concluir e Fechar</button>
          </div>
          </>
          )}
        </article>
      </section>
    </dialog>
  
  );
}
