'use client';

import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useGlobalModal } from '@/provider/GlobalModalProvider';
import { RamaisSetoresProps } from '@/lib/getRamaisSetores.type';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useRouter } from 'next/navigation';
import EditRamalSetorForm from './EditRamalSetorForm,';

interface ModalProps {
  data?: any; 
}

export function ModalRamaisSetores({ data }: ModalProps) {
  const { closeModal, modalData, modalType, isOpen } = useGlobalModal();
  const ramalSetor: RamaisSetoresProps | undefined = modalData?.[0] || modalData;
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  
  function handleRefresh(){
    router.refresh();
    closeModal();
  }

  useEffect(() => {
    if (modalType === 'ramaisSetores' && !ramalSetor) {
      closeModal();
    }
  }, [ramalSetor, modalType, closeModal]);

  if (modalType !== 'ramaisSetores' || !isOpen || !ramalSetor) return null;

  return (
    <dialog className={styles.dialogContainer} open={true}>
      <section className={styles.dialogContent}>
        <article className={styles.container}>
          <button onClick={closeModal} className={styles.dialogBack}>
            <IoIosCloseCircleOutline size={40} color="#4E3182" />
          </button>
          <h2>DETALHES DO RAMAL / SETOR</h2>

          {isEditing ? (
            <EditRamalSetorForm
              dados={ramalSetor}
              onClose={() => setIsEditing(false)}
            />
          ) : (
            <>
              <span className={styles.itemSolicitado}>
                <p className={styles.item}>
                  <b>Usuário:</b>
                  <span>{ramalSetor.usuario ?? '-'}</span>
                </p>

                <p className={styles.item}>
                  <b>Setor:</b>
                  <span>{ramalSetor.setor?.name ?? '-'}</span>
                </p>

                <p className={styles.item}>
                  <b>Ramal:</b>
                  <span>{ramalSetor.ramal ?? '-'}</span>
                </p>

                <p className={styles.item}>
                  <b>Andar:</b>
                  <span>{ramalSetor.andar ?? '-'}</span>
                </p>

                <p className={styles.item}>
                  <b>Vínculo:</b>
                  <span>
                    {ramalSetor.cliente?.name || ramalSetor.instituicaoUnidade?.name || 'Nenhum vínculo'}
                  </span>
                </p>

                <p className={styles.item}>
                   <b>Localização:</b>
                   <span>
                     {ramalSetor.cliente?.endereco || ramalSetor.instituicaoUnidade?.endereco || '-'}
                   </span>
                </p>
              </span>

              <div className={styles.areaButton}>
                <button
                  className={styles.buttonBuy}
                  onClick={() => setIsEditing(true)}
                >
                  <HiOutlinePencilSquare className={styles.icon}/>
                  Editar Informações
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