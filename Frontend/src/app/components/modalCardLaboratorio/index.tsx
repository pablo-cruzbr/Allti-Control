'use client';

import { useEffect } from 'react';
import styles from './styles.module.scss';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useGlobalModal } from '@/provider/GlobalModalProvider';
import { LaboratorioProps } from '@/lib/getLaboratorio.type';
import { useState } from 'react';
import EditCardLaboratorioForm from './EditCardLaboratorioForm';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useRouter } from 'next/navigation';

interface ModalLaboratorioProps {
  data: LaboratorioProps[];
}

export function ModalLaboratorio({ data }: ModalLaboratorioProps) {
  const { closeModal, modalData, modalType, isOpen } = useGlobalModal();
  const laboratorio: LaboratorioProps | undefined = modalData;
  
  console.log("laboratorio recebido no modal", laboratorio);

  const [IsEditing, setIsEditing] = useState(false)
  const router = useRouter();
  
  function handleRefresh(){
  router.refresh();
  closeModal();
  }

  useEffect(() => {
    if (modalType === 'laboratorio' && !laboratorio) {
      closeModal();
    }
  }, [laboratorio, modalType, closeModal]);

  if (modalType !== 'laboratorio' || !isOpen || !laboratorio) return null;

  return (
    <dialog className={styles.dialogContainer} open={true}>
      <section className={styles.dialogContent}>
        <article className={styles.container}>
          <button onClick={closeModal} className={styles.dialogBack}>
            <IoIosCloseCircleOutline size={40} color="#526D82" />
          </button>
          <h2>DETALHES DE LABORATÓRIO</h2>

          {IsEditing ? (
              <EditCardLaboratorioForm
                  laboratorio={laboratorio}
                  onClose={() => setIsEditing(false)}
                  />
            ):(
                    <>

          <span className={styles.itemSolicitado}>
            <p className={styles.item}>
              <b>Patrimônio do Equipamento:</b>
              <span>{laboratorio.equipamento?.patrimonio ?? '-'}</span>
            </p>
            <p className={styles.item}>
              <b>Nome do Equipamento:</b>
              <span>{laboratorio.nomedoEquipamento ?? '-'}</span>
            </p>
            <p className={styles.item}>
              <b>Marca:</b>
              <span>{laboratorio.marca ?? '-'}</span>
            </p>
            <p className={styles.item}>
              <b>Defeito:</b>
              <span>{laboratorio.defeito ?? '-'}</span>
            </p>
            <p className={styles.item}>
              <b>OS de Abertura:</b>
              <span>{laboratorio.osDeAbertura ?? '-'}</span>
            </p>
            <p className={styles.item}>
              <b>OS de Devolução:</b>
              <span>{laboratorio.osDeDevolucao ?? '-'}</span>
            </p>
            <p className={styles.item}>
              <b>Data de Chegada:</b>
              <span>
                {laboratorio.data_de_Chegada
                  ? new Date(laboratorio.data_de_Chegada).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })
                  : '-'}
              </span>
            </p>
            <p className={styles.item}>
              <b>Data de Devolução:</b>
              <span>
                {laboratorio.data_de_Finalizacao
                  ? new Date(laboratorio.data_de_Finalizacao).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })
                  : '-'}
              </span>
            </p>
            <p className={styles.item}>
              <b>Status:</b>
              <span>{laboratorio.statusControledeLaboratorio?.name ?? '-'}</span>
            </p>
            <p className={styles.item}>
              <b>Instituição / Unidade:</b>
              <span>{laboratorio.instituicaoUnidade?.name ?? '-'}</span>
            </p>
            <p className={styles.item}>
              <b>Data de Criação:</b>
              <span>
                {laboratorio.created_at
                  ? new Date(laboratorio.created_at).toLocaleDateString('pt-BR')
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
            <button onClick={handleRefresh} className={styles.buttonBuy}>Concluir Laudo</button>
          </div>
           </>
          )}
        </article>
      </section>
    </dialog>
  );
}
