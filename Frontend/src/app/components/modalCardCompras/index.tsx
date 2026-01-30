'use client';

import styles from './styles.module.scss';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useGlobalModal } from '@/provider/GlobalModalProvider';
import {ComprasProps} from '@/lib/getCompras.type';
import { useState } from 'react';
import EditComprasForm from './EditComprasForm'
import { useRouter } from 'next/navigation';
import { HiOutlinePencilSquare } from "react-icons/hi2";

type ModalComprasProps = {
  data: ComprasProps[]; 
};



export function ModalCompras({ data }: ModalComprasProps) {
  const { closeModal } = useGlobalModal(); //Função para fechar o Modal
  const compra = data?.[0];
  const [IsEditing, setIsEditing] = useState(false)
  const router = useRouter();

  function handleRefresh(){
  router.refresh();
  closeModal();
}
  return (
    <dialog className={styles.dialogContainer}>
      <section className={styles.dialogContent}>
        <article className={styles.container}>
          <button onClick={closeModal} className={styles.dialogBack}>
            <IoIosCloseCircleOutline size={40} color="#526D82" />
          </button>
          <h2>DETALHES DO CARD COMPRAS</h2>

          {IsEditing ? (
            <EditComprasForm
              compra={compra}
              onClose={() => setIsEditing(false)}
            />
          ):(
            <>
          <span className={styles.itemSolicitado}>
            <p className={styles.item}>
              <b>Item Solicitado:</b> {compra?.itemSolicitado ?? 'Carregando...'}
            </p>
          </span>

          <section className={styles.content}>
            <p className={styles.item}>
              <b>Solicitante:</b> <span>{compra?.solicitante ?? '-'}</span>
            </p>

            <p className={styles.item}>
              <b>Motivo da Solicitação:</b>  
              <span>{compra?.motivoDaSolicitacao ?? '-'}</span>
            </p>

            <p className={styles.item}>
              <b>Preço:</b> 
              <span>{compra?.preco ?? '-'}</span>
            </p>

            <p className={styles.item}>
              <b>Link de Compra:</b> 
              <span>
                <a
                  href={compra?.linkDeCompra}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {compra?.linkDeCompra ?? '-'}
                </a>
              </span>
            </p>

            <p className={styles.item}>
              <b>Status:</b>  
              <span>
                {typeof compra?.statusCompras === 'object'
                  ? compra?.statusCompras?.name
                  : compra?.statusCompras ?? '-'}
              </span>
            </p>
          </section>

          <div className={styles.areaButton}>
            <button
            className={styles.buttonBuy}
            onClick={() => setIsEditing(true)}
            >
              <HiOutlinePencilSquare className={styles.icon}/>
              Editar
            </button>
            <button onClick={handleRefresh} className={styles.buttonBuy}>Concluir e Fechar</button>
          </div>
          </>
          )}
        </article>
      </section>
    </dialog>
  );
}
