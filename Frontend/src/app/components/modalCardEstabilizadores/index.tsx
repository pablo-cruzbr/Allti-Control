'use client';

import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useGlobalModal } from '@/provider/GlobalModalProvider';
import { EstabilizadoresProps } from '@/lib/getEstabilizadores.type';
import EditEstabilizadoresForm from './EditEstabilizadoresForm';
import { useRouter } from 'next/navigation';

interface ModalDocumentacaoTecnicaProps {
  data: EstabilizadoresProps[];
}

export function ModalCardEstabilizadores({ data }: ModalDocumentacaoTecnicaProps) {
  const { closeModal, modalData, modalType, isOpen } = useGlobalModal();
  const documentacaoTecnica: EstabilizadoresProps | undefined = modalData?.[0] || modalData;
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  function handleRefresh() {
    router.refresh();
    closeModal();
  }

  useEffect(() => {
    if (modalType === 'Estabilizadores' && !documentacaoTecnica) {
      closeModal();
    }
  }, [documentacaoTecnica, modalType, closeModal]);

  if (modalType !== 'Estabilizadores' || !isOpen || !documentacaoTecnica) return null;

  return (
   <dialog className={styles.dialogContainer} open={true}>
      <section className={styles.dialogContent}>
        <article className={styles.container}>
          <button onClick={closeModal} className={styles.dialogBack}>
            <IoIosCloseCircleOutline size={40} color="#4E3182" />
          </button>
          <h2>DETALHES ESTABILIZADORES</h2>

          {isEditing ? (
            <EditEstabilizadoresForm
              documentacaoTecnica={documentacaoTecnica}
              onClose={() => setIsEditing(false)}
            />
          ) : (
            <>
              <span className={styles.itemSolicitado}>
                <p className={styles.item}>
                  <b>Problema:</b>
                  <span>{documentacaoTecnica.problema ?? '-'}</span>
                </p>

                <p className={styles.item}>
                  <b>Observações:</b>
                  <span>{documentacaoTecnica.observacoes ?? '-'}</span>
                </p>

                <p className={styles.item}>
                  <b>OS da Assistência:</b>
                  <span>{documentacaoTecnica.osdaAssistencia ?? '-'}</span>
                </p>

                <p className={styles.item}>
                  <b>Data de Chegada:</b>
                  <span>
                    {documentacaoTecnica.datadeChegada
                      ? new Date(documentacaoTecnica.datadeChegada).toLocaleDateString('pt-BR')
                      : '-'}
                  </span>
                </p>

                <p className={styles.item}>
                  <b>Data de Retirada:</b>
                  <span>
                    {documentacaoTecnica.datadeRetirada
                      ? new Date(documentacaoTecnica.datadeRetirada).toLocaleDateString('pt-BR')
                      : '-'}
                  </span>
                </p>

                <p className={styles.item}>
                  <b>Estabilizador:</b>
                  <span>
                    {documentacaoTecnica.estabilizadores?.name ?? '-'} (
                    Patrimônio: {documentacaoTecnica.estabilizadores?.patrimonio ?? '-'})
                  </span>
                </p>

                <p className={styles.item}>
                  <b>Status:</b>
                  <span>{documentacaoTecnica.statusEstabilizadores?.name ?? '-'}</span>
                </p>

                <p className={styles.item}>
                  <b>Instituição / Unidade:</b>
                  <span>
                    {documentacaoTecnica.instituicaoUnidade?.name ?? '-'} -{' '}
                    {documentacaoTecnica.instituicaoUnidade?.endereco ?? '-'}
                  </span>
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
                <button className={styles.buttonBuy} onClick={() => setIsEditing(true)}>
                  <HiOutlinePencilSquare className={styles.icon} />
                  Editar
                </button>
                <button className={styles.buttonBuy} onClick={handleRefresh}>
                  Concluir e Fechar
                </button>
              </div>
            </>
          )}
        </article>
      </section>
    </dialog>
  );
}
