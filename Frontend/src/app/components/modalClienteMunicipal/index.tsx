'use client';

import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useGlobalModal } from '@/provider/GlobalModalProvider';
import { ClientesMunicipaisProps } from '@/lib/getClientesMunicipais.type';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import EditClienteMunicipalForm from "./EditClienteMunicipalForm"; 
import { useRouter } from 'next/navigation';

interface ModalProps {
  data?: any; 
}

export function ModalClienteMunicipal({ data }: ModalProps) {
  const { closeModal, modalData, modalType, isOpen } = useGlobalModal();

  const instituicao: ClientesMunicipaisProps | undefined = modalData?.[0] || modalData;
  const [IsEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (modalType === 'clienteMunicipal' && !instituicao) {
      closeModal();
    }
  }, [instituicao, modalType, closeModal]);

  if (modalType !== 'clienteMunicipal' || !isOpen || !instituicao) return null;

  return (
    <dialog className={styles.dialogContainer} open={true}>
      <section className={styles.dialogContent}>
        <article className={styles.container}>
          <button onClick={closeModal} className={styles.dialogBack}>
            <IoIosCloseCircleOutline size={40} color="#4E3182" />
          </button>
          <h2>DETALHES CLIENTE MUNICIPAL</h2>

          {IsEditing ? (
            <EditClienteMunicipalForm
              instituicao={instituicao}
              onClose={() => setIsEditing(false)}
            />
          ) : (
            <>
              <span className={styles.itemSolicitado}>
                <p className={styles.item}>
                  <b>Unidade/Escola:</b>
                  <span>{instituicao.name ?? '-'}</span>
                </p>
                <p className={styles.item}>
                  <b>Endereço:</b>
                  <span>{instituicao.endereco ?? '-'}</span>
                </p>
                <p className={styles.item}>
                  <b>Tipo de Unidade:</b>
                  <span>{instituicao.tipodeinstituicaoUnidade?.name ?? '-'}</span>
                </p>
              </span>

              <div className={styles.areaButton}>
                <button
                  className={styles.buttonBuy}
                  onClick={() => setIsEditing(true)}
                >
                  <HiOutlinePencilSquare className={styles.icon}/>
                  Editar Unidade
                </button>
                <button className={styles.buttonBuy} onClick={closeModal}>Fechar</button>
              </div>
            </>
          )}
        </article>
      </section>
    </dialog>
  );
}