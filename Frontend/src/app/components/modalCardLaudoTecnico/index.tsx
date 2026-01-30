'use client';

import { useEffect } from 'react';
import styles from './styles.module.scss';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useGlobalModal } from '@/provider/GlobalModalProvider';
import { LaudoTecnicoProps } from '@/lib/getLaudoTecnico.type';
import EditCardLaudoTecnicoForm from './EditCardLaudoTecnicoForm';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { HiOutlinePencilSquare } from "react-icons/hi2";

interface ModalLaudoTecnicoProps {
  data: LaudoTecnicoProps[];
}

export function ModalLaudoTecnico({data}: ModalLaudoTecnicoProps) {
  const { closeModal, modalData } = useGlobalModal();
  const laudo: LaudoTecnicoProps | undefined = modalData?.[0] || modalData;
  const [IsEditing, setIsEditing] = useState(false)
  const router = useRouter();
  
   function handleRefresh(){
    router.refresh();
    closeModal();
  }

  useEffect(() => {
    if (!laudo) {
      closeModal();
    }
  }, [laudo, closeModal]);

  if (!laudo) return null;

  return (
    <dialog className={styles.dialogContainer} open={true}>
      <section className={styles.dialogContent}>
        <article className={styles.container}>
          <button onClick={closeModal} className={styles.dialogBack}>
            <IoIosCloseCircleOutline size={40} color="#526D82" />
          </button>
          <h2>DETALHES DO LAUDO TÉCNICO</h2>


           {IsEditing ? (
                <EditCardLaudoTecnicoForm
                  laudoTecnico={laudo}
                   onClose={() => setIsEditing(false)}
                    />
                    ):(
                    <>
          <span className={styles.itemSolicitado}>
            <p className={styles.item}>
              <b>Patrimônio do Equipamento:</b>  
              <span>{laudo?.equipamento?.patrimonio ?? '-'}</span>
            </p>
            <p className={styles.item}>
              <b>Descrição do Problema:</b> 
              <span>{laudo?.descricaodoProblema ?? '-'}</span>
            </p>
            <p className={styles.item}>
              <b>OS do Laboratório:</b> 
              <span>{laudo?.osLab ?? '-'}</span>
            </p>
            <p className={styles.item}>
              <b>Instituição/Unidade:</b> 
              <span>{laudo?.instituicaoUnidade?.name ?? '-'}</span>
            </p>
            <p className={styles.item}>
              <b>Endereço:</b> 
              <span>{laudo?.instituicaoUnidade?.endereco ?? '-'}</span>
            </p>
            <p className={styles.item}>
              <b>Técnico Responsável:</b> 
              <span>{laudo?.tecnico?.name ?? '-'}</span>
            </p>
            <p className={styles.item}>
              <b>Data de Criação:</b> 
              <span>{laudo?.created_at ? new Date(laudo.created_at).toLocaleDateString('pt-BR') : '-'}</span>
            </p>
           <p className={styles.item}>
              <b>Data Alterada Mes/Ano:</b> {/* Mudei o label para 'Data' já que não é mais apenas 'Mês/Ano' */}
              <span>
                {laudo?.mesAno
                  ? new Date(laudo.mesAno).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })
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
            <button className={styles.buttonBuy} onClick={handleRefresh}>Concluir Laudo</button>
          </div>
          </>
          )}
        </article>
      </section>
    </dialog>
  );
}
