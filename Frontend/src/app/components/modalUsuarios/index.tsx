'use client';

import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useGlobalModal } from '@/provider/GlobalModalProvider';
import { UsuariosProps } from '@/lib/getUsuario.type';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useRouter } from 'next/navigation';
import EditUsuariosForm from './EditUsuariosForm'; 

interface ModalProps {
  data?: any; 
}

export function ModalUsuarios({ data }: ModalProps) {
  const { closeModal, modalData, modalType, isOpen } = useGlobalModal();
  
  const usuario: UsuariosProps | undefined = Array.isArray(modalData) ? modalData[0] : modalData;
  
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  
  function handleRefresh(){
    router.refresh();
    closeModal();
  }

  useEffect(() => {
    if (!isOpen) {
      setIsEditing(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (modalType === 'usuarios' && !usuario) {
      closeModal();
    }
  }, [usuario, modalType, closeModal]);

  if (modalType !== 'usuarios' || !isOpen || !usuario) return null;

  return (
    <dialog className={styles.dialogContainer} open={true}>
      <section className={styles.dialogContent}>
        <article className={styles.container}>
          <button onClick={closeModal} className={styles.dialogBack}>
            <IoIosCloseCircleOutline size={40} color="#4E3182" />
          </button>
          
          <h2>{isEditing ? "EDITAR USUÁRIO" : "DETALHES DO USUÁRIO"}</h2>

          {isEditing ? (
            <EditUsuariosForm
              dados={usuario}
              onClose={() => setIsEditing(false)}
            />
          ) : (
            <>
              <span className={styles.itemSolicitado}>
                <p className={styles.item}>
                  <b>Nome:</b>
                  <span>{usuario.name ?? '-'}</span>
                </p>

                <p className={styles.item}>
                  <b>E-mail:</b>
                  <span>{usuario.email ?? '-'}</span>
                </p>

                <p className={styles.item}>
                  <b>Setor:</b>
                  <span>{usuario.setor?.name ?? '-'}</span>
                </p>

                <p className={styles.item}>
                  <b>Empresa / Cliente:</b>
                  <span>{usuario.cliente?.name ?? '-'}</span>
                </p>

                <p className={styles.item}>
                  <b>Vínculo Unidade:</b>
                  <span>
                    {usuario.instituicaoUnidade?.name || 'Nenhum vínculo'}
                  </span>
                </p>

                <p className={styles.item}>
                   <b>Localização:</b>
                   <span>
                     {usuario.cliente?.endereco || usuario.instituicaoUnidade?.endereco || '-'}
                   </span>
                </p>

                <p className={styles.item}>
                   <b>Técnico Responsável:</b>
                   <span>{usuario.tecnico?.name || 'Não atribuído'}</span>
                </p>
                
                <p className={styles.item}>
                   <b>Cadastrado em:</b>
                   <span>
                     {usuario.created_at 
                       ? new Date(usuario.created_at).toLocaleDateString('pt-BR') 
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