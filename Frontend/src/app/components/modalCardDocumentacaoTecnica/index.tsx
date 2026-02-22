'use client';

import { useEffect } from 'react';
import styles from './styles.module.scss';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useGlobalModal } from '@/provider/GlobalModalProvider';
import { DocumentacaoTecnicaProps } from '@/lib/getDocumentacaoTecnica.type';
import { useState } from 'react';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import EditDocumentacaoForm from "./EditDocumentacaoTecnicaForm"
import { useRouter } from 'next/navigation';

interface ModalDocumentacaoTecnicaProps {
  data:  DocumentacaoTecnicaProps[];
}

export function ModalDocumentacaoTecnica({ data }: ModalDocumentacaoTecnicaProps) {
  const { closeModal, modalData, modalType, isOpen } = useGlobalModal();
  const documentacaoTecnica: DocumentacaoTecnicaProps | undefined = modalData?.[0] || modalData;
  const [IsEditing, setIsEditing] = useState(false)
  const router = useRouter();
  
    function handleRefresh(){
    router.refresh();
    closeModal();
  }

  useEffect(() => {
    if (modalType === 'documentacaoTecnica' && !documentacaoTecnica) {
      closeModal();
    }
  }, [documentacaoTecnica, modalType, closeModal]);

  if (modalType !== 'documentacaoTecnica' || !isOpen || !documentacaoTecnica) return null;

  return (
   <dialog className={styles.dialogContainer} open={true}>
      <section className={styles.dialogContent}>
        <article className={styles.container}>
          <button onClick={closeModal} className={styles.dialogBack}>
            <IoIosCloseCircleOutline size={40} color="#4E3182" />
          </button>
          <h2>DETALHES DE DOCUMENTAÇÃO TECNICA</h2>

          {IsEditing ? (
                      <EditDocumentacaoForm
                        documentacaoTecnica={documentacaoTecnica}
                        onClose={() => setIsEditing(false)}
                      />
                    ):(
          <>
          <span className={styles.itemSolicitado}>
            <p className={styles.item}>
              <b>Titulo:</b>
              <span>{documentacaoTecnica.titulo ?? '-'}</span>
            </p>
            <p className={styles.item}>
              <b>Descrição:</b>
              <span>{documentacaoTecnica.descricao ?? '-'}</span>
            </p>

            <p className={styles.item}>
              <b>Cliente:</b>
              <span>{documentacaoTecnica.cliente.name ?? '-'}</span>
            </p>

            <p className={styles.item}>
              <b>Tecnico:</b>
              <span>{documentacaoTecnica.tecnico.name ?? '-'}</span>
            </p>
            <p className={styles.item}>
              <b>Data de Criação:</b>
              <span>
                {documentacaoTecnica.created_at
                  ? new Date(documentacaoTecnica.created_at).toLocaleDateString('pt-BR')
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
