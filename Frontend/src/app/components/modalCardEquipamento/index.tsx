'use client';

import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useGlobalModal } from '@/provider/GlobalModalProvider';
import { EquipamentoProps } from '@/lib/getEquipamento.type';
import { useRouter } from 'next/navigation';


interface ModalProps {
  data: any; 
}

export function ModalCardEquipamento({ data }: ModalProps) {
 const { closeModal, modalData, modalType, isOpen } = useGlobalModal();
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const equipamento: EquipamentoProps | undefined = modalData?.[0] || modalData;

  function handleRefresh() {
    router.refresh();
    closeModal();
  }

  useEffect(() => {
    if (modalType === 'equipamento' && !equipamento) {
      closeModal();
    }
  }, [equipamento, modalType, closeModal]);

  if (modalType !== 'equipamento' || !isOpen || !equipamento) return null;

  return (
    <dialog className={styles.dialogContainer} open={true}>
      <section className={styles.dialogContent}>
        <article className={styles.container}>
          <button onClick={closeModal} className={styles.dialogBack}>
            <IoIosCloseCircleOutline size={40} color="#4E3182" />
          </button>
          
          <h2>DETALHES DO EQUIPAMENTO</h2>

          {isEditing ? (
            <p>Formulário de Edição em breve...</p>
          ) : (
            <>
              <span className={styles.itemSolicitado}>
                <p className={styles.item}>
                  <b>Nome da Máquina:</b>
                  <span>{equipamento.name ?? '-'}</span>
                </p>

                <p className={styles.item}>
                  <b>Patrimônio:</b>
                  <span>{equipamento.patrimonio ?? '-'}</span>
                </p>

                <p className={styles.item}>
                  <b>Instituição / Unidade:</b>
                  <span>
                    {equipamento.instituicaoUnidade?.name ?? 'Não vinculada'}
                  </span>
                </p>

                <p className={styles.item}>
                  <b>Endereço da Unidade:</b>
                  <span>
                    {equipamento.instituicaoUnidade?.endereco ?? '-'}
                  </span>
                </p>

                <p className={styles.item}>
                  <b>Data de Cadastro:</b>
                  <span>
                    {equipamento.created_at
                      ? new Date(equipamento.created_at).toLocaleDateString('pt-BR')
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
                  Fechar
                </button>
              </div>
            </>
          )}
        </article>
      </section>
    </dialog>
  );
}