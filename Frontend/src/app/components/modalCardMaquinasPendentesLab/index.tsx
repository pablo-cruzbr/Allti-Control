'use client';

import { useEffect } from 'react';
import styles from './styles.module.scss';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useGlobalModal } from '@/provider/GlobalModalProvider';
import { MaquinasPendentesLabProps } from '@/lib/getMaquinasPendentesLab.type';
import EditMaquinasPendentesLabForm from './EditCardMaquinasPendentesLabForm';
import { useState } from 'react';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useRouter } from 'next/navigation';

interface ModalMaquinasPendentesLaboratorioProps {
  data: MaquinasPendentesLabProps[];
}

export function ModalMaquinasPendentesLab({ data }: ModalMaquinasPendentesLaboratorioProps) {
  const { closeModal, modalData, modalType, isOpen } = useGlobalModal();
  const maquinasLab: MaquinasPendentesLabProps | undefined = modalData?.[0] || modalData;
  const [IsEditing, setIsEditing] = useState(false);
  const router = useRouter();
    
     function handleRefresh(){
      router.refresh();
      closeModal();
    }

  useEffect(() => {
    if (modalType === 'maquinasPendentesLab' && !maquinasLab) {
      closeModal();
    }
  }, [maquinasLab, modalType, closeModal]);

  if (modalType !== 'maquinasPendentesLab' || !isOpen || !maquinasLab) return null;

  return (
    <dialog className={styles.dialogContainer} open={true}>
      <section className={styles.dialogContent}>
        <article className={styles.container}>
          <button onClick={closeModal} className={styles.dialogBack}>
            <IoIosCloseCircleOutline size={40} color="#526D82" />
          </button>
          <h2>DETALHES DE MAQUINAS PENDENTES LABORATÓRIO</h2>

          {IsEditing ? (
              <EditMaquinasPendentesLabForm
                  maquinasPendentesLab={maquinasLab}
                  onClose={() => setIsEditing(false)}
                  />
                  ):(
              <>

          <span className={styles.itemSolicitado}>
            <p className={styles.item}>
              <b>Patrimônio do Equipamento:</b>
              <span>{maquinasLab.equipamento?.patrimonio ?? '-'}</span>
            </p>
            <p className={styles.item}>
              <b>Nome do Equipamento:</b>
              <span>{maquinasLab.equipamento?.name ?? '-'}</span>
            </p>

            <p className={styles.item}>
              <b>Numero de Série:</b>
              <span>{maquinasLab.numeroDeSerie ?? '-'}</span>
            </p>

            <p className={styles.item}>
              <b>ID da OS:</b>
              <span>{maquinasLab.idDaOs ?? '-'}</span>
            </p>
            <p className={styles.item}>
              <b>Observaçãop:</b>
              <span>{maquinasLab.obs?? '-'}</span>
            </p>

            <p className={styles.item}>
              <b>SSD:</b>
              <span>{maquinasLab.ssd ?? '-'}</span>
            </p>
            
           
            <p className={styles.item}>
              <b>Status:</b>
              <span>{maquinasLab.statusMaquinasPendentesLab?.name ?? '-'}</span>
            </p>

            <p className={styles.item}>
              <b>Instituição / Unidade:</b>
              <span>{maquinasLab.instituicaoUnidade?.name ?? '-'}</span>
            </p>

            <p className={styles.item}>
              <b>Data de Criação:</b>
              <span>
                {maquinasLab.created_at
                  ? new Date(maquinasLab.created_at).toLocaleDateString('pt-BR')
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
